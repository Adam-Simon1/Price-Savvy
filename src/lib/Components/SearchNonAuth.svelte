<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { autoComplete } from 'effortless-complete';
  import CheckBoxes from './CheckBoxes.svelte';
  import { tescoStatus, kauflandStatus } from '../../routes/auth/search/stores';
  import DropDown from './DropDown.svelte';
  import { sortingMethod } from '../../routes/auth/search/stores';
  import Cookies from 'js-cookie';
  import { i } from '@inlang/sdk-js';

  let kaufland: string[];
  let tesco: string[];
  let autocompleteData: string[];

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
    interface data {
      kaufland: string;
      tesco: string;
    }

    const response = await fetch('/search', { method: 'POST' });
    const data = (await response.json()) as data;

    kaufland = await JSON.parse(data.kaufland);
    tesco = await JSON.parse(data.tesco);
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

<div class="">
  <DropDown />

  <div class="flex justify-center mb-10">
    <div class="inline-block z-10 mt-10">
      <div class="mb-2 text-center">
        <input
          type="text"
          class="w-screen h-12 rounded-full bg-gray-700 p-5 font-montserrat text-white text-xl shadow-2xl max-w-md"
          id="inputElement"
          placeholder={i('searchProduct')}
        />
      </div>
      <div class="flex justify-center">
        <div
          id="suggestionsContainer"
          class="bg-gray-700 rounded-3xl text-white font-montserrat w-screen max-h-128 overflow-y-auto shadow-2xl max-w-md absolute"
        />
      </div>
    </div>
  </div>

  <div class="lg:flex lg:w-screen lg:justify-center lg:items-center">
    <div class="lg:mr-[30%] 2xl:mr-[30rem]">
      <div class="flex justify-center items-center flex-col">
        <div class="text-center grid">
          <div class="row-start-1 col-start-1">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              readonly
              class="resize-none h-128 w-screen max-w-sm bg-gray-700 rounded-3xl overflow-y-auto shadow-2xl px-6 text-lg text-white font-montserrat"
              bind:value={textareaValue}
            />
          </div>

          <div class="flex justify-end row-start-1 col-start-1 self-end mr-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="cursor-pointer"
              width="50"
              height="50"
              on:click={removeSuggestion}
              role="none"
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
        </div>
      </div>
      <div class="text-center mt-5 border-b-2 border-gray-800 pb-10 lg:border-b-0">
        <h1 class="text-white font-montserrat text-2xl">{i('price') + ' ' + roundedSum} €</h1>
      </div>
    </div>

    <CheckBoxes />
  </div>

  <div class="text-center mt-10 mb-10">
    <h1 class="font-montserrat text-white text-2xl mb-5">{i('shoppingListSentence')}</h1>
    <a
      class="font-montserrat text-white text-xl p-3 bg-green-600 rounded-3xl hover:bg-green-700 active:translate-y-1 transition"
      href="/shopping-lists">{i('shoppingList')}</a
    >
  </div>
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
