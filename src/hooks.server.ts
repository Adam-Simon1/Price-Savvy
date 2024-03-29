/** 
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_AUTH_SECRET } from '$env/static/private';

export const handle = SvelteKitAuth({
  providers: [GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })],
  secret: GITHUB_AUTH_SECRET
});
*/

import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { dbPoolConnect, pool } from '$lib/db';
import { json } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  const client = await dbPoolConnect();
  const { cookies } = event;
  const token = cookies.get('token');

  if (token) {
    try {
      const jwtUser = jwt.verify(token, JWT_SECRET);
      if (typeof jwtUser === 'string') {
        throw new Error('Something went wrong');
      }

      const results = await client.query('SELECT * FROM accounts WHERE id = $1', [jwtUser.id]);
      const user = results.rows[0];

      if (!results || !user) {
        throw new Error('User not found');
      }

      interface SessionUser {
        id: number;
        email: string;
        username: string;
      }

      const sessionUser: SessionUser = {
        id: user.id,
        email: user.email,
        username: user.username
      };

      event.locals.user = sessionUser;
      client.release();
    } catch (error) {
      client.release();
      console.error(error);
    }
  }

  return await resolve(event);
};
