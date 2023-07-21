<script lang="ts">
  import GetStarted from './GetStarted.svelte';
  import Preview from './Preview.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(async () => {
    const response = await fetch('/api', { method: 'GET' });
    const user = await response.json();
    console.log(user);
    if (user.status == 200) {
      goto('/home');
    }
  });
</script>

<main class="bg-gray-900 h-auto flex justify-center items-center flex-col">
  <GetStarted/>
  <Preview/>
</main>
