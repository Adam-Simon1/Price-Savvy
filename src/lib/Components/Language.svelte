<script lang="ts">
  import { languages, switchLanguage } from '@inlang/sdk-js';

  const sources = ['/English.webp', '/Slovak.webp'];
</script>

{#each languages as lang, i}
  <button on:click={() => switchLanguage(lang)} class="mr-3">
    <img
      src={sources[i]}
      alt="Flag"
      class="w-20 h-12 rounded-3xl border-2 border-gray-700 hover:border-gray-500 transition"
    />
  </button>
{/each}
