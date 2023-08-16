<script lang="ts">
  import { i } from '@inlang/sdk-js';
</script>

<article class="flex flex-col-reverse mb-10 lg:flex-row">
  <div class="flex justify-center">
    <img
      src="/search-page.webp"
      alt="Search Page"
      class="rounded-3xl border-2 border-gray-800 shadow-xl w-[90%] max-w-[500px] lg:w-[500px]"
    />
  </div>
  <div class="flex items-center mb-5 justify-center">
    <div class="text-center lg:text-end lg:w-128">
      <h1 class="text-white font-montserrat text-2xl">{i('search')}</h1>
      <h2 class="text-gray-500 font-montserrat text-xl">
        {i('searchDesc')}
      </h2>
    </div>
  </div>
</article>

<article class="flex flex-col mb-10 lg:flex-row">
  <div class="flex items-center mb-5 justify-center">
    <div class="text-center lg:text-start lg:w-128">
      <h1 class="text-white font-montserrat text-2xl">{i('create')}</h1>
      <h2 class="text-gray-500 font-montserrat text-xl">
        {i('createDesc')}
      </h2>
    </div>
  </div>
  <div class="flex justify-center">
    <img
      src="/shopping-lists.webp"
      alt="Shopping Lists"
      class="rounded-3xl border-2 border-gray-800 shadow-xl w-[90%] max-w-[500px] lg:w-[500px]"
    />
  </div>
</article>

<article class="flex flex-col-reverse lg:flex-row">
  <div class="flex justify-center">
    <img
      src="/saved-shopping-lists.webp"
      alt="Saved Shopping Lists"
      class="rounded-3xl border-2 border-gray-800 shadow-xl w-[90%] max-w-[500px] lg:w-[500px]"
    />
  </div>
  <div class="flex items-center mb-5 justify-center">
    <div class="text-center lg:text-end lg:w-128">
      <h1 class="text-white font-montserrat text-2xl">{i('saved')}</h1>
      <h2 class="text-gray-500 font-montserrat text-xl">
        {i('savedDesc')}
      </h2>
    </div>
  </div>
</article>
