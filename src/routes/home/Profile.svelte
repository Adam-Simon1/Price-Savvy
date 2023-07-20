<script lang="ts">
  import { goto } from '$app/navigation';
  import { slide } from 'svelte/transition';

  let isExpanded = false;

  function clickBtn() {
    isExpanded = !isExpanded;
  }

  async function signOutUser() {
    const response = await fetch('/api/signout', { method: 'POST' });
    console.log(response);
    const status = await response.json();
    if (status.status == 302) {
      goto('/');
    }
  }
</script>

<div class="absolute top-5 left-10 flex flex-col">
  <button
    on:click={clickBtn}
    class="text-white text-2xl font-montserrat w-40 h-12 bg-gray-900 rounded-full hover:bg-slate-800 active:translate-y-1 transition"
    >Profile</button
  >
  {#if isExpanded}
    <nav transition:slide>
      <ul>
        <li>
          <button
            class="w-40 h-12 rounded-full text-xl font-montserrat bg-gray-700 mt-4 text-red-600 hover:bg-gray-800 transition flex flex-row justify-center items-center"
            on:click={signOutUser}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
              />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>Sign Out</button
          >
        </li>
      </ul>
    </nav>
  {/if}
</div>
