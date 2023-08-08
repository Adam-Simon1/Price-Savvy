import { dbPoolConnect } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const client = await dbPoolConnect();
  const index = event.params.slug;
  const userId = event.locals.user.id;

  try {
    const results = await client.query(`SELECT table${index} FROM producttables WHERE id = $1`, [
      userId
    ]);

    const data: string = results.rows[0][`table${index}`];

    return {
      data: data
    };
  } catch (error) {
    console.log(error);
  }

  // User auth
  const user = event.locals.user;

  if (!user) {
    throw redirect(307, '/');
  }
}
