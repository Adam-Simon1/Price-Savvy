import { redirect } from '@sveltejs/kit';

export function load(event) {
  // User auth
  const user = event.locals.user;

  if (!user) {
    throw redirect(307, '/');
  }
}
