<script>
  import Search from '$lib/Components/Search.svelte';
  import DrawerSearch from '$lib/Components/DrawerSearch.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<main class="bg-gray-900 min-h-screen flex justify-center align-top min-w-full">
  <title>Select products in sale</title>
  {#if visible}
    <div transition:fly={{ y: 500, duration: 300 }}>
      <DrawerSearch />
      <Search />
    </div>
  {/if}
</main>
