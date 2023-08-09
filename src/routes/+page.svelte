<script lang="ts">
  import GetStarted from '$lib/Components/GetStarted.svelte';
  import Preview from '$lib/Components/Preview.svelte';
</script>

<main class="bg-gray-900 min-h-screen min-w-full flex justify-center items-center flex-col">
  <a
    href="/signin"
    class="text-white font-montserrat bg-green-600 text-2xl p-2 rounded-3xl absolute top-4 right-5 w-36 text-center"
    >Sign In</a
  >

  <GetStarted />
  <Preview />
</main>
