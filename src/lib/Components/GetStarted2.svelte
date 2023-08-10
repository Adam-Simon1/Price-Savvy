<script lang="ts">
  import { goto } from '$app/navigation';
  function signInLink() {
    goto('/auth/search');
  }
</script>

<div class="mb-12 mt-52 border-b-2 border-gray-600 pb-5">
  <div class="text-center">
    <div class="flex flex-col mb-10 sm:flex-row justify-center items-center sm:items-start">
      <h1 class="text-white font-montserrat text-4xl font-normal flex flex-row mb-5">Welcome to</h1>
      <h1 class="font-montserrat font-bold pl-2 text-white text-4xl">Price Savvy</h1>
    </div>

    <button
      class="text-white font-montserrat text-2xl bg-green-600 h-12 w-52 rounded-3xl hover:bg-green-700 active:translate-y-1 transition shadow-xl"
      on:click={signInLink}>Get Started</button
    >
  </div>
</div>
