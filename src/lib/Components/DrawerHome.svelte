<script lang="ts">
  import { fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { i } from '@inlang/sdk-js';

  let isExpanded = false;

  function openMenu() {
    isExpanded = !isExpanded;
  }

  async function signOut() {
    const response = await fetch('/api/signout', {
      method: 'POST'
    });
    const text = await response.json();

    if (text.status == 302) {
      goto('/');
    }
  }
</script>

<div class="absolute top-3 right-3 sm:hidden">
  <button on:click|preventDefault={openMenu}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-menu-deep"
      width="35"
      height="35"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6h16" />
      <path d="M7 12h13" />
      <path d="M10 18h10" />
    </svg></button
  >
</div>

{#if isExpanded}
  <div
    class="h-screen w-3/4 max-w-xs bg-gray-700 absolute top-0 left-0 p-10 flex flex-col z-50"
    transition:fly={{ x: -200, duration: 300 }}
  >
    <a
      href={''}
      on:click={signOut}
      class="text-xl font-montserrat text-red-600 mb-5 hover:bg-gray-800 transition rounded-3xl p-1 pl-3 flex flex-row items-center"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path d="M9 12h12l-3 -3" />
        <path d="M18 15l3 -3" />
      </svg>{i('signOut')}</a
    >
    <a
      href="/auth/search"
      class="text-xl font-montserrat text-white mb-5 hover:bg-gray-800 transition rounded-3xl p-1 pl-3"
      >{i('edit')}</a
    >
    <a
      href="/auth/saved-shopping-lists"
      class="text-xl font-montserrat text-white mb-5 hover:bg-gray-800 transition rounded-3xl p-1 pl-3"
      >{i('savedLists')}</a
    >
    <a
      href="https://github.com/Adam-Simon1/Svelte-Price-Savvy"
      class="text-xl font-montserrat text-white mb-5 hover:bg-gray-800 transition rounded-3xl p-1 pl-3"
      >{i('githubLink')}</a
    >
  </div>
{/if}
