<script lang="ts">
  import Form from '$lib/Components/FormSignUp.svelte';
  import GithubLink from '$lib/Components/GithubLink.svelte';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<main class="flex justify-center items-center min-h-screen bg-gray-900">
  <title>Sign Up to Price Savvy</title>
  <GithubLink />

  {#if visible}
    <div transition:fly={{ y: 500, duration: 300 }}>
      <Form />
    </div>
  {/if}
</main>
