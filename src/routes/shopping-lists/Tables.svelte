<script lang="ts">
  import { onMount } from 'svelte';

  interface Items {
    name: string;
    price: number;
    counter: number;
  }

  let tescoItemsArray: string[] = [];
  let kauflandItemsArray: string[] = [];
  let tescoItems: Items[] = [];
  let kauflandItems: Items[] = [];

  onMount(() => {
    tescoItemsArray = JSON.parse(localStorage.getItem('tesco') as string);
    kauflandItemsArray = JSON.parse(localStorage.getItem('kaufland') as string);

    tescoItems = tescoItemsArray.map((item) => {
      const [name, priceString] = item.split(';');
      const itemName = name.trim();
      const price = parseFloat(priceString.trim().replace(',', '.'));
      return { name: itemName, price: price, counter: 1 };
    });

    kauflandItems = kauflandItemsArray.map((item) => {
      const [name, priceString] = item.split(';');
      const itemName = name.trim();
      const price = parseFloat(priceString.trim().replace(',', '.'));
      return { name: itemName, price: price, counter: 1 };
    });
  });

  function calculateSubTotal(items: Items[], index: number): number {
    let total = 0;
    total = items[index].counter * items[index].price;

    return Math.round((total + Number.EPSILON) * 100) / 100;
  }

  function calculateTotal(items: Items[]): number {
    let total = 0;
    items.forEach((item) => {
      total += item.counter * item.price;
    });

    return Math.round((total + Number.EPSILON) * 100) / 100;
  }

  function calculateTotalBase(items: Items[]): number {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });

    return Math.round((total + Number.EPSILON) * 100) / 100;
  }

  function calculateTotalQuantity(items: Items[]): number {
    let total = 0;
    items.forEach((item) => {
      total += item.counter;
    });

    return total;
  }

  function updateCounter(index: number, value: number, items: Items[]) {
    items[index].counter = value;
  }
</script>

{#if tescoItemsArray.length > 0}
  <div class="relative overflow-x-auto shadow-2xl rounded-3xl max-w-screen-md">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-white uppercase bg-green-600">
        <tr>
          <th scope="col" class="px-6 py-3 font-montserrat"> Product name </th>
          <th scope="col" class="px-6 py-3 font-montserrat"> Price </th>
          <th scope="col" class="px-6 py-3 font-montserrat"> Quantity </th>
          <th scope="col" class="px-6 py-3 font-montserrat"> Total Price </th>
        </tr>
      </thead>
      <tbody>
        {#each tescoItems as tescoItem, index}
          <tr class="bg-gray-800 border-gray-700 border-b">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {tescoItem.name}
            </th>
            <td class="px-6 py-4"> {tescoItem.price} €</td>
            <td class="px-6 py-4">
              <input
                type="number"
                class="w-20 bg-gray-800 text-center text-sm"
                bind:value={tescoItem.counter}
                on:input={() => updateCounter(index, tescoItem.counter, tescoItems)}
              />
            </td>
            <td class="px-6 py-4"> {calculateSubTotal(tescoItems, index)} €</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr class="font-semibold text-gray-900 dark:text-white">
          <th scope="row" class="px-6 py-3 text-base">Total</th>
          <td class="px-6 py-3">{calculateTotalBase(tescoItems)} €</td>
          <td class="px-[3.2rem] py-3">{calculateTotalQuantity(tescoItems)}</td>
          <td class="px-6 py-3">{calculateTotal(tescoItems)} €</td>
        </tr>
      </tfoot>
    </table>
  </div>
{/if}

{#if kauflandItemsArray.length > 0}
  <div class="relative overflow-x-auto shadow-2xl rounded-3xl max-w-screen-md">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-white uppercase bg-green-600">
        <tr>
          <th scope="col" class="px-6 py-3 font-montserrat"> Product name </th>
          <th scope="col" class="px-6 py-3 font-montserrat"> Price </th>
          <th scope="col" class="px-6 py-3 font-montserrat"> Quantity </th>
          <th scope="col" class="px-6 py-3 font-montserrat"> Total Price </th>
        </tr>
      </thead>
      <tbody>
        {#each kauflandItems as kauflandItem, index}
          <tr class="bg-gray-800 border-gray-700 border-b">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {kauflandItem.name}
            </th>
            <td class="px-6 py-4"> {kauflandItem.price} €</td>
            <td class="px-6 py-4">
              <input
                type="number"
                class="w-20 bg-gray-800 text-center text-sm"
                bind:value={kauflandItem.counter}
                on:input={() => updateCounter(index, kauflandItem.counter, kauflandItems)}
              />
            </td>
            <td class="px-6 py-4"> {calculateSubTotal(kauflandItems, index)} €</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr class="font-semibold text-gray-900 dark:text-white">
          <th scope="row" class="px-6 py-3 text-base">Total</th>
          <td class="px-6 py-3">{calculateTotalBase(kauflandItems)} €</td>
          <td class="px-[3.2rem] py-3">{calculateTotalQuantity(kauflandItems)}</td>
          <td class="px-6 py-3">{calculateTotal(kauflandItems)} €</td>
        </tr>
      </tfoot>
    </table>
  </div>
{/if}
