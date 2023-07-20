<script>
  let isChecked = false;
  function allCheckbox() {
    isChecked = !isChecked;
  }
</script>

<div class="flex flex-col row-start-2 col-start-3 self-center justify-self-center mt-108">
  {#if isChecked}
    <div class="mb-3 flex items-center">
      <input
        type="checkbox"
        name="tesco"
        id=""
        class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        checked
      />
      <label for="tesco" class="font-montserrat text-white text-2xl ml-2">Tesco</label>
    </div>
    <div class="mb-3 flex items-center">
      <input
        type="checkbox"
        name="kaufland"
        id=""
        class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        checked
      />
      <label for="kaufland" class="font-montserrat text-white text-2xl ml-2">Kaufland</label>
    </div>
  {:else}
    <div class="mb-3 flex items-center">
      <input
        type="checkbox"
        name="tesco"
        id=""
        class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label for="tesco" class="font-montserrat text-white text-2xl ml-2">Tesco</label>
    </div>
    <div class="mb-3 flex items-center">
      <input
        type="checkbox"
        name="kaufland"
        id=""
        class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label for="kaufland" class="font-montserrat text-white text-2xl ml-2">Kaufland</label>
    </div>
  {/if}

  <div class="flex items-center mb-4">
    <input
      type="checkbox"
      name="all"
      id=""
      class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      on:change={allCheckbox}
    />
    <label for="all" class="font-montserrat text-white text-2xl ml-2">All</label>
  </div>
  <div class="mb-3">
    <button
      class="w-40 h-10 bg-gray-700 text-white font-montserrat rounded-3xl text-xl shadow-2xl hover:bg-gray-800 active:translate-y-1 transition"
      >Apply</button
    >
  </div>
  <div>
    <button
      class="w-40 h-10 bg-gray-700 text-white font-montserrat rounded-3xl text-xl shadow-2xl hover:bg-gray-800 active:translate-y-1 transition"
      >Reset</button
    >
  </div>
</div>
