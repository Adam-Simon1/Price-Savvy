import { redirect } from '@sveltejs/kit';

export function load(event) {
  const user = event.locals.user;

  if (user) {
    throw redirect(307, '/auth/shopping-lists');
  }
}
