<script lang="ts">
  import TablesCount from '$lib/Components/TablesCount.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let visible = false;

  onMount(() => {
    visible = true;
  });

  export let data;

  const indexes: number[] = JSON.parse(data.indexes as string);
</script>

<main class="min-h-screen bg-gray-900 flex justify-start items-center flex-col w-screen">
  <title>Your saved shopping lists</title>
  {#if visible}
    <div
      transition:fly={{ y: 500, duration: 300 }}
      class="flex justify-start items-center flex-col w-screen"
    >
      <h1 class="text-white font-montserrat text-4xl my-10 font-bold">Shopping Lists</h1>

      {#if data.status == 400}
        <h1 class="text-white font-montserrat text-xl mb-10 text-center">{data.message}</h1>
        <a
          href="/auth/search"
          class="text-white font-montserrat h-12 w-64 bg-green-600 text-xl flex justify-center items-center rounded-3xl hover:bg-green-700 active:translate-y-1 transition"
          >Create a shopping list</a
        >
      {:else}
        {#each indexes as index, i}
          <TablesCount index={i + 1} identifier={index} />
        {/each}
      {/if}
    </div>
  {/if}
</main>
