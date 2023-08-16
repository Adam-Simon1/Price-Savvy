<script lang="ts">
  import { tescoStatus, kauflandStatus } from '../../routes/auth/search/stores';
  import { i } from '@inlang/sdk-js';

  let areChecked = false;

  function checkAll() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    for (let i = 0; i < checkboxes.length - 1; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      checkbox.checked = !areChecked;
    }
    areChecked = !areChecked;
  }

  function sendStatus() {
    const tescoCheckbox = document.getElementById('tesco') as HTMLInputElement;
    const kauflandCheckbox = document.getElementById('kaufland') as HTMLInputElement;
    tescoStatus.set(tescoCheckbox.checked);
    kauflandStatus.set(kauflandCheckbox.checked);
  }

  function reset() {
    tescoStatus.set(false);
    kauflandStatus.set(false);

    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      checkbox.checked = false;
    }
  }
</script>

<div class="flex flex-col justify-center items-center mt-10 mb-24 lg:mb-0 lg:mt-0">
  <div class="flex flex-row lg:flex-col">
    <div class="mb-3 flex items-center mr-3">
      <input
        type="checkbox"
        name="tesco"
        id="tesco"
        class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label for="tesco" class="font-montserrat text-white text-2xl ml-2">Tesco</label>
    </div>
    <div class="mb-3 flex items-center mr-3">
      <input
        type="checkbox"
        name="kaufland"
        id="kaufland"
        class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label for="kaufland" class="font-montserrat text-white text-2xl ml-2">Kaufland</label>
    </div>

    <div class="flex items-center mb-4">
      <input
        type="checkbox"
        name="all"
        id="all"
        class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        on:change={checkAll}
      />
      <label for="all" class="font-montserrat text-white text-2xl ml-2">{i('all')}</label>
    </div>
  </div>

  <div class="mb-3">
    <button
      class="w-40 h-10 bg-gray-700 text-white font-montserrat rounded-3xl text-xl shadow-2xl hover:bg-gray-800 active:translate-y-1 transition"
      on:click={sendStatus}>{i('apply')}</button
    >
  </div>
  <div>
    <button
      class="w-40 h-10 bg-gray-700 text-white font-montserrat rounded-3xl text-xl shadow-2xl hover:bg-gray-800 active:translate-y-1 transition"
      on:click={reset}>{i('reset')}</button
    >
  </div>
</div>
