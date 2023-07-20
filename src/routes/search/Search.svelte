<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import LoadingScreen from '../LoadingScreen.svelte';
  import { autoComplete } from 'effortless-complete';
  import CheckBoxes from './CheckBoxes.svelte';
  import DropDown from './DropDown.svelte';

  let kaufland: string[];
  let tesco: string[];
  let isLoading = writable(false);

  onMount(async () => {
    isLoading.set(true);

    interface data {
      kaufland: string;
      tesco: string;
    }

    //const response = await fetch('/search', { method: 'POST' });
    //const data = (await response.json()) as data;

    //kaufland = await JSON.parse(data.kaufland);
    //tesco = await JSON.parse(data.tesco);
    isLoading.set(false);

    let inputElement = document.getElementById('inputElement');
    const suggestionContainer = document.getElementById('suggestionsContainer');

    const config = {
      suggestionContainer: suggestionContainer,
      data: kaufland,
      inputElement: inputElement,
      clickAction: insertSuggestion,
      filtering: 'all'
    };

    autoComplete(config);

    function insertSuggestion(suggestion: string) {
      console.log(suggestion);
    }
  });
</script>

{#if $isLoading}
  <LoadingScreen />
{/if}

<div class="grid grid-cols-3 grid-rows-3">
  <div class="flex flex-col justify-center row-start-1 col-start-2 justify-self-center">
    <div class="w-108">
      <input
        type="text"
        class="w-108 h-12 rounded-full bg-gray-700 p-5 font-montserrat text-white text-xl shadow-2xl"
        id="inputElement"
        placeholder="Search for a product:"
      />
    </div>
    <div
      id="suggestionsContainer"
      class="bg-gray-700 rounded-3xl text-white font-montserrat w-108 max-h-128 overflow-y-auto mt-5"
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
        class="resize-none h-128 w-96 bg-gray-700 rounded-3xl overflow-y-auto shadow-2xl"
      />
    </div>
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
