<script lang="ts">
  import TablesCount from '$lib/Components/TablesCount.svelte';

  export let data;

  const indexes = JSON.parse(data.indexes);
</script>

<main class="min-h-screen bg-gray-900 flex justify-start items-center flex-col">
  <h1 class="text-white font-montserrat text-4xl my-10 font-bold">Shopping Lists</h1>

  {#if data.status == 400}
    <h1>{indexes}</h1>
  {:else}
    {#each indexes as index, i}
      <TablesCount index={i + 1} identifier={index} />
    {/each}
  {/if}
</main>
