import { redirect } from '@sveltejs/kit';

export async function load() {
  const response = await fetch('http://localhost:5173/api', { method: 'GET' });
  const text = await response.json();
  console.log(text.status)
  if (text.status !== 200) {
    throw redirect(307, '/');
  }
}
