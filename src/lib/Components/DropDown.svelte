<script lang="ts">
  import { slide } from 'svelte/transition';
  import { sortingMethod } from '../../routes/auth/search/stores';
  import { i } from '@inlang/sdk-js';

  let isExpanded = false;
  let sortingOption: string = i('sort');

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
      class="w-80 h-12 font-montserrat text-xl text-white bg-gray-700 rounded-3xl hover:bg-gray-800 transition shadow-2xl"
      on:click={clickBtn}>{sortingOption}</button
    >
  </div>

  {#if isExpanded}
    <div class="flex flex-col bg-gray-700 rounded-3xl shadow-2xl w-80" transition:slide>
      <button
        class="w-80 h-12 font-montserrat text-xl text-white bg-gray-700 rounded-3xl hover:bg-gray-800 transition"
        on:click={() => clickContent(i('lowToHigh'))}>{i('lowToHigh')}</button
      >
      <button
        class="w-80 h-12 font-montserrat text-xl text-white bg-gray-700 rounded-3xl hover:bg-gray-800 transition"
        on:click={() => clickContent(i('highToLow'))}>{i('highToLow')}</button
      >
      <button
        class="w-80 h-12 font-montserrat text-xl text-white bg-gray-700 rounded-3xl hover:bg-gray-800 transition"
        on:click={() => clickContent(i('aZ'))}>{i('aZ')}</button
      >
      <button
        class="w-80 h-12 font-montserrat text-xl text-white bg-gray-700 rounded-3xl hover:bg-gray-800 transition"
        on:click={() => clickContent(i('zA'))}>{i('zA')}</button
      >
    </div>
  {/if}
</div>
