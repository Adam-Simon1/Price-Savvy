<script>
  import SavedTables from '$lib/Components/SavedTables.svelte';

  export let data;
  const list = data.data;
</script>

<main class="bg-gray-900 min-h-screen">
  <SavedTables data={list} />
</main>
