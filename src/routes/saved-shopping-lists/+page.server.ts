import { dbPoolConnect, pool } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const client = await dbPoolConnect();
  const userId = event.locals.user.id;

  try {
    const indexesQuery = await client.query('SELECT idarray FROM elementid WHERE id = $1', [
      userId
    ]);

    const indexes = indexesQuery.rows[0].idarray;

    if (indexesQuery.rows.length > 0) {
      return {
        status: 200,
        indexes: indexes
      };
    } else {
      return {
        status: 400,
        indexes: "You don't have any saved shopping lists."
      };
    }
  } catch (error) {
    console.log(error);
  }

  // User auth
  const user = event.locals.user;

  if (!user) {
    throw redirect(307, '/');
  }
}
