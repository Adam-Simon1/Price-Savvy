<script>
  import Search from '$lib/Components/Search.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
</script>

<main class="bg-gray-900 h-screen flex justify-center align-top">
  <Search />
</main>
