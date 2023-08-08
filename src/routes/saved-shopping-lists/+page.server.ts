import { dbPoolConnect, pool } from '$lib/db';

export async function load(event) {
  const client = await dbPoolConnect();
  const userId = event.locals.user.id;

  try {
    const results = await client.query(
      `SELECT count(column_name) as column_count FROM information_schema.columns WHERE table_name='producttables'`
    );

    const count = results.rows[0].column_count;

    for (let i = 1; i <= count; i++) {
      try {
        const columnName = `table${i}`;
        const query = `SELECT count(*) FROM producttables WHERE ${columnName} is null and id = $1`;
        const emptyColumn = await client.query(query, [userId]);

        const column = emptyColumn.rows[0].count;

        if (column == 1) {
          console.log(i);
          return {
            count: i - 1
          };
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
