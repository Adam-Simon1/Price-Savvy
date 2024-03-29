import { json } from '@sveltejs/kit';
import { dbPoolConnect, pool } from '$lib/db';

export async function POST({ request, locals }): Promise<object> {
  const client = await dbPoolConnect();

  const data = await request.json();
  const { tesco, kaufland } = data;
  const userId = locals.user.id;
  const combined = JSON.stringify(tesco) + ':' + JSON.stringify(kaufland);

  try {
    const userIdExists = await client.query('SELECT * FROM producttables WHERE id = $1', [userId]);
    if (userIdExists.rows.length == 0) {
      const insertUserId = await client.query(
        'INSERT INTO producttables (id, table1) VALUES ($1, $2)',
        [userId, combined]
      );

      const indexes: number[] = [1];

      const insertUserIndexes = await client.query(
        'INSERT INTO elementid (id, idarray) VALUES ($1, $2)',
        [userId, JSON.stringify(indexes)]
      );

      client.release();

      return json({
        status: 200,
        message: 'Saved successfully'
      });
    } else {
      const columnCount = await client.query(
        `SELECT count(column_name) as column_count FROM information_schema.columns WHERE table_name='producttables'`
      );
      const count = columnCount.rows[0].column_count;

      for (let i = 1; i <= count; i++) {
        const emptyColumn = await client.query(
          `SELECT count(*) FROM producttables WHERE table${i} is null and id = $1`,
          [userId]
        );

        const column = emptyColumn.rows[0].count;

        if (i == 20) {
          client.release();
          return json({
            status: 400,
            message: 'The limit of 20 shopping lists has been reached'
          });
        }

        if (column == 1) {
          const insertShopList = await client.query(
            `UPDATE producttables SET table${i} = $1 WHERE id = $2`,
            [combined, userId]
          );

          const extractIndexes = await client.query('SELECT idarray FROM elementid WHERE id = $1', [
            userId
          ]);

          const indexes = extractIndexes.rows[0].idarray;

          const indexesArr: number[] = JSON.parse(indexes);

          indexesArr.push(i);

          const updateIndexes = await client.query(
            'UPDATE elementid SET idarray = $1 WHERE id = $2',
            [JSON.stringify(indexesArr), userId]
          );

          client.release();

          return json({
            status: 200,
            message: 'Saved successfully'
          });
        }
      }
    }
  } catch (error) {
    client.release();
    console.log(error);
  }

  return json({
    status: 400,
    message: 'Server error'
  });
}
