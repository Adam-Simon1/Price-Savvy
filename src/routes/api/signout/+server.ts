import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
  await cookies.delete('token', {path: '/', sameSite: 'strict'});
  return json({ status: 302 });
}
