<script lang="ts">
    import { fly } from 'svelte/transition';
  
    let isExpanded = false;
  
    function openMenu() {
      isExpanded = !isExpanded;
    }
  </script>
  
  <div class="absolute top-3 right-3">
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
        href="/home"
        class="text-xl font-montserrat text-white mb-5 hover:bg-gray-800 transition rounded-3xl p-1 pl-3"
        >Home</a
      >
      <a
        href="/shopping-lists"
        class="text-xl font-montserrat text-white mb-5 hover:bg-gray-800 transition rounded-3xl p-1 pl-3"
        >Create Shopping Lists</a
      >
      <a
        href="/saved-shopping-lists"
        class="text-xl font-montserrat text-white mb-5 hover:bg-gray-800 transition rounded-3xl p-1 pl-3"
        >Saved Shopping Lists</a
      >
      <a
        href="https://github.com/Adam-Simon1/Svelte-Price-Savvy"
        class="text-xl font-montserrat text-white mb-5 hover:bg-gray-800 transition rounded-3xl p-1 pl-3"
        >Github</a
      >
    </div>
  {/if}
  