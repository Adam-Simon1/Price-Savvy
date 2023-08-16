<script lang="ts">
  import Preview from '$lib/Components/Preview.svelte';
  import GetStarted2 from '$lib/Components/GetStarted2.svelte';
  import Profile from '$lib/Components/Profile.svelte';
  import DrawerHome from '$lib/Components/DrawerHome.svelte';
  import GithubLink from '$lib/Components/GithubLink.svelte';
  import Language from '$lib/Components/Language.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { i } from '@inlang/sdk-js';

  let visible = false;

  onMount(() => {
    visible = true;
  });

  export let data;
</script>

<main class="bg-gray-900 min-h-screen flex justify-center items-center flex-col">
  <title>Welcome to Price Savvy</title>
  <GithubLink />
  <a
    href="/auth/saved-shopping-lists"
    class="text-white text-2xl font-montserrat hover:bg-gray-800 transition rounded-3xl w-80 text-center active:translate-y-1 absolute top-5 right-56 p-2 hidden sm:inline-block"
    >{i('savedLists')}</a
  >

  <div class="absolute top-4">
    <Language />
  </div>

  <Profile name={data.username} />
  <DrawerHome />

  {#if visible}
    <div transition:fly={{ y: 500, duration: 300 }}>
      <GetStarted2 />
      <Preview />
    </div>
  {/if}
</main>
