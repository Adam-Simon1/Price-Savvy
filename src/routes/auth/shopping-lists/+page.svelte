<script lang="ts">
  import Tables from '$lib/Components/Tables.svelte';
  import DrawerLists from '$lib/Components/DrawerLists.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<main class="bg-gray-900 min-h-screen w-screen">
  {#if visible}
    <div transition:fly={{ y: 500, duration: 300 }}>
      <DrawerLists />
      <Tables />
    </div>
  {/if}
</main>
