<script>
  import SearchNonAuth from '$lib/Components/SearchNonAuth.svelte';
  import DrawerSearchNonAuth from '$lib/Components/DrawerSearchNonAuth.svelte';

  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<main class="bg-gray-900 min-h-screen flex justify-center align-top min-w-full">
  {#if visible}
    <div transition:fly={{ y: 500, duration: 300 }}>
      <DrawerSearchNonAuth />
      <SearchNonAuth />
    </div>
  {/if}
</main>
