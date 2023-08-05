import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const user = event.locals.user;

  if (user) {
    throw redirect(307, '/home');
  }
}
