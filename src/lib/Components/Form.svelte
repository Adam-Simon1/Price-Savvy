<script lang="ts">
  import { goto } from '$app/navigation';
  import { signIn } from '@auth/sveltekit/client';

  let email: string;
  let password: string;
  let message: string = '';
  let status: number;
  const handleSubmit = async () => {
    message = '';

    const response = await fetch('/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    interface data {
      message: string;
      status: number;
    }

    const data = (await response.json()) as data;
    message = data.message;
    status = data.status;

    if (data.status == 302) {
      goto('/auth/home');
    }
  };

  const githubSignIn = async () => {
    await signIn('github');

    const response = await fetch('/api/github-signin', { method: 'POST' });

    interface user {
      name: string;
      image: string;
      email: string;
    }

    const user = (await response.json()) as user;
    console.log(user.name);
    if (user.name && user.image && user.email) {
      goto('/auth/home');
    }
  };
</script>

<div>
  <div class="flex justify-center items-center">
    <h1 class="text-white font-montserrat text-4xl font-bold">Sign In</h1>
  </div>

  <div>
    <button
      class="h-12 w-80 rounded-3xl bg-gray-700 p-3 mb-2 mt-14 text-xl font-montserrat text-white flex items-center justify-center hover:bg-gray-800 active:translate-y-1 transition shadow-xl"
      on:click={githubSignIn}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2"
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
          d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
        />
      </svg>
      Sign in with github</button
    >
  </div>

  <div>
    <p class="text-white flex justify-center font-montserrat text-lg">or</p>
  </div>

  <form method="POST" class="flex flex-col" on:submit|preventDefault={handleSubmit}>
    <input
      type="text"
      placeholder="Email"
      class="h-12 w-80 rounded-3xl bg-gray-700 p-3 my-2 text-xl font-montserrat text-white shadow-xl"
      bind:value={email}
      required
    />
    <input
      type="password"
      placeholder="Password"
      class="h-12 w-80 rounded-3xl bg-gray-700 p-3 my-2 text-xl font-montserrat text-white shadow-xl"
      bind:value={password}
      required
    />
    <div class="text-center">
      {#if status == 302}
        <p class="text-green-600 font-montserrat">{message}</p>
      {:else}
        <p class="text-red-600 font-montserrat">{message}</p>
      {/if}
    </div>
    <button
      type="submit"
      class="h-12 w-80 rounded-3xl bg-green-600 p-3 my-2 text-2xl font-montserrat text-white flex items-center justify-center hover:bg-green-700 active:translate-y-1 transition shadow-xl"
      >Sign In</button
    >
  </form>
  <div>
    <a
      href="/signup"
      class="text-blue-400 font-montserrat text-lg flex justify-center hover:text-blue-500"
      >Don't have an account?</a
    >
  </div>
</div>
