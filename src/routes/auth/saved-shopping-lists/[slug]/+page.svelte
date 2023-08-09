<script>
  import SavedTables from '$lib/Components/SavedTables.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let visible = false;

  onMount(() => {
    visible = true;
  });

  export let data;
  const list = data.data;
</script>

<main class="bg-gray-900 min-h-screen">
  {#if visible}
    <div transition:fly={{ y: 500, duration: 300 }}>
      <SavedTables data={list} />
    </div>
  {/if}
</main>
