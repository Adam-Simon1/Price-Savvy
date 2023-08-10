<script lang="ts">
  import TablesNonAuth from '$lib/Components/TablesNonAuth.svelte';
  import DrawerTablesNonAuth from '$lib/Components/DrawerTablesNonAuth.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<main class="bg-gray-900 min-h-screen w-screen">
  <title>Create shopping lists</title>
  {#if visible}
    <div transition:fly={{ y: 500, duration: 300 }}>
      <DrawerTablesNonAuth />
      <TablesNonAuth />
    </div>
  {/if}
</main>
