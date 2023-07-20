<script lang="ts">
  import Preview from '../Preview.svelte';
  import GetStarted2 from './GetStarted2.svelte';
  import Profile from './Profile.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(async () => {
    const response = await fetch('/api', { method: 'GET' });
    const user = await response.json();
    console.log(user);
    if (user.status !== 200) {
      goto('/');
    }
  });
</script>

<main class="bg-gray-900 h-auto flex justify-center items-center flex-col">
  <Profile />
  <GetStarted2 />
  <Preview />
</main>
