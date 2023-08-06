<script lang="ts">
  import { slide } from 'svelte/transition';
  import { sortingMethod } from '../../routes/search/stores';
  let isExpanded = false;
  let sortingOption: string = 'Sort prices by:';

  function clickBtn() {
    isExpanded = !isExpanded;
  }

  function clickContent(option: string) {
    isExpanded = !isExpanded;

    sortingOption = option;
    sortingMethod.set(sortingOption);
  }
</script>

<div class="mt-5 flex justify-center flex-col items-center z-20">
  <div class="mb-1">
    <button
      class="w-52 h-12 font-montserrat text-xl text-white bg-gray-700 rounded-3xl hover:bg-gray-800 transition shadow-2xl"
      on:click={clickBtn}>{sortingOption}</button
    >
  </div>

  {#if isExpanded}
    <div class="flex flex-col bg-gray-700 rounded-3xl shadow-2xl w-52" transition:slide>
      <button
        class="w-52 h-12 font-montserrat text-xl text-white bg-gray-700 rounded-3xl hover:bg-gray-800 transition"
        on:click={() => clickContent('Lowest to Highest')}>Lowest to Highest</button
      >
      <button
        class="w-52 h-12 font-montserrat text-xl text-white bg-gray-700 rounded-3xl hover:bg-gray-800 transition"
        on:click={() => clickContent('Highest to Lowest')}>Highest to Lowest</button
      >
      <button
        class="w-52 h-12 font-montserrat text-xl text-white bg-gray-700 rounded-3xl hover:bg-gray-800 transition"
        on:click={() => clickContent('A-Z Sorted')}>A-Z Sorted</button
      >
      <button
        class="w-52 h-12 font-montserrat text-xl text-white bg-gray-700 rounded-3xl hover:bg-gray-800 transition"
        on:click={() => clickContent('Z-A Sorted')}>Z-A Sorted</button
      >
    </div>
  {/if}
</div>
