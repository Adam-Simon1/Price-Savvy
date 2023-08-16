<script lang="ts">
  import { goto } from '$app/navigation';
  import { i } from '@inlang/sdk-js';

  let message: string = '';
  let status: number;
  let username: string;
  let password: string;
  let email: string;
  let visible: boolean = false;

  const handleSubmit = async () => {
    message = '';

    const response = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    message = data.message;
    status = data.status;

    if (data.status == 302) {
      goto('/signin');
    }
  };
  const openEye = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
   <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
</svg>`;

  const closedEye = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-closed" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4"></path>
   <path d="M3 15l2.5 -3.8"></path>
   <path d="M21 14.976l-2.492 -3.776"></path>
   <path d="M9 17l.5 -4"></path>
   <path d="M15 17l-.5 -4"></path>
</svg>`;

  function toggle() {
    visible = !visible;
    document.querySelector('#password').type = visible ? 'text' : 'password';
  }
</script>

<div>
  <div class="flex justify-center items-center">
    <h1 class="text-white font-montserrat text-4xl font-bold">{i('signUp')}</h1>
  </div>
  <form class="flex flex-col mt-14 ml-5" on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      placeholder={i('username')}
      name="username"
      class="h-12 w-80 rounded-3xl bg-gray-700 p-3 my-2 text-xl text-white font-montserrat shadow-xl"
      bind:value={username}
      required
    />
    <input
      type="text"
      placeholder={i('email')}
      name="email"
      class="h-12 w-80 rounded-3xl bg-gray-700 p-3 my-2 text-xl font-montserrat text-white shadow-xl"
      bind:value={email}
      required
    />
    <div class="flex flex-row">
      <input
        type="password"
        placeholder={i('password')}
        name="password"
        class="h-12 w-80 rounded-3xl bg-gray-700 p-3 my-2 text-xl font-montserrat text-white shadow-xl"
        bind:value={password}
        id="password"
        required
      />
      <button class="relative right-10" type="button" id="switch" on:click={toggle}
        >{#if visible}
          {@html openEye}
        {:else}
          {@html closedEye}
        {/if}</button
      >
    </div>

    <div class="text-center w-80">
      {#if status == 302}
        <p class="text-green-600 font-montserrat">{message}</p>
      {:else}
        <p class="text-red-600 font-montserrat">{message}</p>
      {/if}
    </div>

    <button
      type="submit"
      class="h-12 w-80 rounded-3xl bg-green-600 p-3 my-2 text-2xl font-montserrat text-white flex items-center justify-center hover:bg-green-700 active:translate-y-1 transition shadow-xl"
      >{i('signUp')}</button
    >
  </form>
  <div>
    <a
      href="/signin"
      class="text-blue-400 font-montserrat text-lg flex justify-center hover:text-blue-500"
      >{i('haveAccount')}</a
    >
  </div>
</div>
