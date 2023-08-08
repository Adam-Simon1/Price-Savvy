import { dbPoolConnect, pool } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
  const client = await dbPoolConnect();
  const userId: number = event.locals.user.id;

  try {
    const indexesQuery = await client.query('SELECT idarray FROM elementid WHERE id = $1', [
      userId
    ]);

    if (indexesQuery.rows.length > 0) {
      const indexes: number[] = indexesQuery.rows[0].idarray;
      console.log(indexes);

      return {
        status: 200,
        indexes: JSON.stringify(indexes)
      };
    } else {
      return {
        status: 400,
        indexes: '[]',
        message: "You don't have any saved shopping lists."
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
