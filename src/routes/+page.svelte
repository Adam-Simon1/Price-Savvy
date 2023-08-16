<script lang="ts">
  import GetStarted from '$lib/Components/GetStarted.svelte';
  import Preview from '$lib/Components/Preview.svelte';
  import GithubLink from '$lib/Components/GithubLink.svelte';
  import Language from '$lib/Components/Language.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { i } from '@inlang/sdk-js';

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<main class="bg-gray-900 min-h-screen min-w-full flex justify-center items-center flex-col">
  <title>Welcome to Price Savvy</title>

  <a
    href="/signin"
    class="text-white font-montserrat bg-green-600 text-2xl p-2 rounded-3xl absolute top-4 right-5 w-36 text-center hover:bg-green-700 active:translate-y-1 transition z-20"
    >{i('signIn')}</a
  >

  <div class="w-screen flex justify-center items-center top-4 absolute">
    <Language />
  </div>

  <GithubLink />

  {#if visible}
    <div transition:fly={{ y: 500, duration: 300 }}>
      <GetStarted />
      <Preview />
    </div>
  {/if}
</main>
