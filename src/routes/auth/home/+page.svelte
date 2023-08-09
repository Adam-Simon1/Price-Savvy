<script lang="ts">
  import Preview from '$lib/Components/Preview.svelte';
  import GetStarted2 from '$lib/Components/GetStarted2.svelte';
  import Profile from '$lib/Components/Profile.svelte';
  import DrawerHome from '$lib/Components/DrawerHome.svelte';

  export let data;
</script>

<main class="bg-gray-900 h-auto flex justify-center items-center flex-col">
  <DrawerHome />

  <a
    href="/auth/saved-shopping-lists"
    class="text-white text-2xl font-montserrat hover:bg-gray-800 transition rounded-3xl w-80 text-center active:translate-y-1 absolute top-5 right-56 p-2 hidden sm:inline-block"
    >Saved Shopping Lists</a
  >

  <Profile name={data.username} />
  <GetStarted2 />
  <Preview />
</main>
