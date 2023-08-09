<script lang="ts">
  import { goto } from '$app/navigation';
  import GithubLink from './GithubLink.svelte';
  function signInLink() {
    goto('/signin');
  }
</script>

<div class="">
  <div>
    <GithubLink />
  </div>

  <div class="border-b-2 border-gray-600 pb-5 mt-44 mb-10">
    <div class="text-center mb-5">
      <h1 class="font-montserrat text-4xl text-white font-bold">Price Savvy</h1>
    </div>

    <div class="text-center mb-7">
      <h2 class="text-gray-500 font-montserrat text-2xl">
        No better way to save money on products
      </h2>
    </div>
    <div class="text-center">
      <button
        class="font-montserrat bg-green-600 h-12 w-44 text-white text-2xl rounded-3xl hover:bg-green-700 active:translate-y-1 transition"
        on:click|preventDefault={signInLink}>Get Started</button
      >
    </div>
  </div>
</div>
