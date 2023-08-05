import { json, redirect } from '@sveltejs/kit';

export async function POST({ cookies }): Promise<object> {
  await cookies.delete('token', { path: '/', sameSite: 'strict' });
  throw redirect(307, '/')
}
