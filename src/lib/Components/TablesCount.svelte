<script lang="ts">
  export let index: number;
  export let identifier: number;

  async function removeShoppingList() {
    if (confirm('Are you sure you want to remove this shopping list?')) {
      const response = await fetch('/api/remove', {
        method: 'POST',
        body: JSON.stringify({ identifier })
      });

      location.reload();
    }
  }
</script>

<div
  class="border-2 border-gray-700 h-16 w-[90%] max-w-2xl rounded-3xl flex items-center mb-3 justify-between"
>
  <a
    href="/auth/saved-shopping-lists/{identifier.toString()}"
    class="text-green-600 font-montserrat text-xl ml-10">Shopping list {index}</a
  >

  <button class="mr-10" on:click={removeShoppingList} id={identifier.toString()}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-red-600"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  </button>
</div>
