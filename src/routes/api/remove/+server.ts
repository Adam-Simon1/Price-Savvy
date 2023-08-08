import { json } from '@sveltejs/kit';
import { dbPoolConnect } from '$lib/db.js';

export async function POST({ request, locals }): Promise<object> {
  const client = await dbPoolConnect();

  const data = await request.json();
  const index: number = data.identifier;
  const userId: number = locals.user.id;

  try {
    const removeList = await client.query(
      `UPDATE producttables SET table${index} = NULL WHERE id = $1`,
      [userId]
    );

    const extractIndexes = await client.query(`SELECT idarray FROM elementid WHERE id = $1`, [
      userId
    ]);

    const indexes = extractIndexes.rows[0].idarray;
    const indexArr: number[] = JSON.parse(indexes);
    const modifiedIndexArr = indexArr.filter((element) => element !== index);
    console.log(indexArr);

    const insertModifiedArr = await client.query(`UPDATE elementid SET idarray = $1 WHERE id = $2`, [
      JSON.stringify(modifiedIndexArr),
      userId
    ]);

    client.release();
    return json({
      status: 200
    });
  } catch (error) {
    client.release();
    return json({
      status: 400
    });
  }
}
