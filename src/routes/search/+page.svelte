<script>
  import Search from './Search.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(async () => {
    const response = await fetch('/api', { method: 'GET' });
    const user = await response.json();
    console.log(user);
    if (user.status !== 200) {
      goto('/');
    }
  });
</script>

<main class="bg-gray-900 h-screen flex justify-center align-top">
  <Search />
</main>
