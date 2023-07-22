<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { writable } from 'svelte/store';
  import LoadingScreen from '../LoadingScreen.svelte';
  import { autoComplete } from 'effortless-complete';
  import CheckBoxes from './CheckBoxes.svelte';
  import { tescoStatus, kauflandStatus } from './stores';
  import DropDown from './DropDown.svelte';
  import { sortingMethod } from './stores';
  import Cookies from 'js-cookie';

  let kaufland: string[];
  let tesco: string[];
  let autocompleteData: string[];
  let isLoading = writable(false);
  let textareaValue = '';
  let roundedSum = 0;

  if (Cookies.get('textareaCookie')) {
    const cookie = Cookies.get('textareaCookie') as string;
    const textareaArray = cookie.split('\n').filter((line) => line.trim() !== '');
    const sum = textareaArray.reduce((total, item) => total + getPrice(item), 0);
    roundedSum = Math.round((sum + Number.EPSILON) * 100) / 100;
    textareaValue = cookie;
  }

  $: {
    const tescoChecked = $tescoStatus;
    const kauflandChecked = $kauflandStatus;
    const bothChecked = tescoChecked && kauflandChecked;

    autocompleteData = bothChecked
      ? tesco.concat(kaufland)
      : tescoChecked
      ? tesco
      : kauflandChecked
      ? kaufland
      : [];

    if ($sortingMethod == 'Lowest to Highest') {
      autocompleteData.sort((a, b) => getPrice(a) - getPrice(b));
    } else if ($sortingMethod == 'Highest to Lowest') {
      autocompleteData.sort((a, b) => getPrice(b) - getPrice(a));
    } else if ($sortingMethod == 'A-Z Sorted') {
      autocompleteData.sort((a, b) => a.localeCompare(b));
    } else if ($sortingMethod == 'Z-A Sorted') {
      autocompleteData.sort((a, b) => b.localeCompare(a));
    }
  }

  onMount(async () => {
    isLoading.set(true);

    interface data {
      kaufland: string;
      tesco: string;
    }

    const response = await fetch('/search', { method: 'POST' });
    const data = (await response.json()) as data;

    kaufland = await JSON.parse(data.kaufland);
    tesco = await JSON.parse(data.tesco);
    isLoading.set(false);
  });

  afterUpdate(() => {
    const inputElement = document.getElementById('inputElement');
    const suggestionContainer = document.getElementById('suggestionsContainer');

    const config = {
      suggestionContainer: suggestionContainer,
      data: autocompleteData,
      inputElement: inputElement,
      clickAction: insertSuggestion,
      filtering: 'all'
    };

    autoComplete(config);
  });

  function insertSuggestion(suggestion: string) {
    textareaValue = textareaValue + '\n' + suggestion;
    Cookies.set('textareaCookie', textareaValue, { expires: 1 });

    const textareaArray = textareaValue.split('\n').filter((line) => line.trim() !== '');
    const sum = textareaArray.reduce((total, item) => total + getPrice(item), 0);
    roundedSum = Math.round((sum + Number.EPSILON) * 100) / 100;

    updateLocalStorage(textareaArray);
  }

  function removeSuggestion() {
    let textareaArray = textareaValue.split('\n').filter((line) => line.trim() !== '');
    textareaArray = textareaArray.slice(0, -1);

    const sum = textareaArray.reduce((total, item) => total + getPrice(item), 0);
    roundedSum = Math.round((sum + Number.EPSILON) * 100) / 100;
    textareaValue = textareaArray.join('\n');
    Cookies.set('textareaCookie', textareaValue, { expires: 1 });

    updateLocalStorage(textareaArray);
  }

  function updateLocalStorage(textArray: string[]) {
    let tescoArray: string[] = [];
    let kauflandArray: string[] = [];

    for (let i = 0; i < textArray.length; i++) {
      const item = textArray[i];
      if (kaufland.includes(item)) {
        kauflandArray.push(item);
      } else if (tesco.includes(item)) {
        tescoArray.push(item);
      }
    }

    localStorage.setItem('kaufland', JSON.stringify(kauflandArray));
    localStorage.setItem('tesco', JSON.stringify(tescoArray));
  }

  function getPrice(item: string): number {
    const priceString = item.split(';')[1].trim();
    const price = parseFloat(priceString.replace(',', '.'));
    return price;
  }
</script>

{#if $isLoading}
  <LoadingScreen />
{/if}

<div class="grid grid-cols-3 grid-rows-3">
  <div
    class="inline-block row-start-1 row-end-3 col-start-2 justify-self-center self-start mt-32 z-10" 
  >
    <div class="w-108 mb-2">
      <input
        type="text"
        class="w-108 h-12 rounded-full bg-gray-700 p-5 font-montserrat text-white text-xl shadow-2xl"
        id="inputElement"
        placeholder="Search for a product:"
      />
    </div>
    <div
      id="suggestionsContainer"
      class="bg-gray-700 rounded-3xl text-white font-montserrat w-108 max-h-128 overflow-y-auto shadow-2xl"
    />
  </div>

  <div class="col-start-1 row-start-2">
    <div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        readonly
        class="resize-none h-128 w-96 bg-gray-700 rounded-3xl overflow-y-auto shadow-2xl px-6 py-5 text-lg text-white font-montserrat"
        bind:value={textareaValue}
      />
    </div>
  </div>

  <div
    class="cursor-pointer row-start-3 col-start-1 self-center justify-self-start ml-80"
    on:click={removeSuggestion}
    role="none"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-arrow-back-up"
      width="50"
      height="50"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="#fff"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 14l-4 -4l4 -4" />
      <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
    </svg>
  </div>

  <div class="justify-self-start col-start-1 row-start-3 self-center mt-32 ml-32">
    <h1 class="text-white font-montserrat text-2xl">Price: {roundedSum} €</h1>
  </div>

  <DropDown />
  <CheckBoxes />
</div>

<style global>
  :global(.suggestionElement) {
    height: auto;
    font-size: 1.1rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 1.5rem;
  }
  :global(.suggestionElement:hover) {
    background-color: rgb(31 41 55);
  }
</style>
