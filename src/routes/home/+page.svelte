<script lang="ts">
  import Preview from '../Preview.svelte';
  import GetStarted2 from './GetStarted2.svelte';
  import Profile from './Profile.svelte';

  export let data;
</script>

<main class="bg-gray-900 h-auto flex justify-center items-center flex-col">
  <Profile name={data.username} />
  <GetStarted2 />
  <Preview />
</main>
