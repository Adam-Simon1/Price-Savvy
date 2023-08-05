<script lang="ts">
  import Preview from '$lib/Components/Preview.svelte';
  import GetStarted2 from '$lib/Components/GetStarted2.svelte';
  import Profile from '$lib/Components/Profile.svelte';

  export let data;
</script>

<main class="bg-gray-900 h-auto flex justify-center items-center flex-col">
  <Profile name={data.username} />
  <GetStarted2 />
  <Preview />
</main>
