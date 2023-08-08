import { dbPoolConnect, pool } from '$lib/db';

export async function load(event) {
  const client = await dbPoolConnect();
  const userId = event.locals.user.id;

  try {
    const indexesQuery = await client.query('SELECT idarray FROM elementid WHERE id = $1', [
      userId
    ]);

    const indexes = indexesQuery.rows[0].idarray;

    return {
      indexes: indexes
    };
  } catch (error) {
    console.log(error);
  }
}
