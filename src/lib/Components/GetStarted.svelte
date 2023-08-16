<script lang="ts">
  import { i } from '@inlang/sdk-js';
</script>

<div class="">
  <div class="border-b-2 border-gray-600 pb-5 mt-44 mb-10">
    <div class="text-center mb-5">
      <h1 class="font-montserrat text-4xl text-white font-bold">Price Savvy</h1>
    </div>

    <div class="text-center mb-7">
      <h2 class="text-gray-500 font-montserrat text-2xl">
        {i('desc')}
      </h2>
    </div>
    <div class="text-center">
      <a
        class="font-montserrat bg-green-600 p-2 px-5 text-white text-2xl rounded-3xl hover:bg-green-700 active:translate-y-1 transition"
        href="/search">{i('start')}</a
      >
    </div>
  </div>
</div>
