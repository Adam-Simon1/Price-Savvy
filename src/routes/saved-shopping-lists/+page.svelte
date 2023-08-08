<script lang="ts">
  import TablesCount from '$lib/Components/TablesCount.svelte';
  export let data;
</script>

<main class="min-h-screen bg-gray-900 flex justify-start items-center flex-col">
  <h1 class="text-white font-montserrat text-4xl my-10 font-bold">Shopping Lists</h1>
  {#each Array(data.count) as _, i}
    <TablesCount index={i + 1} />
  {/each}
</main>
