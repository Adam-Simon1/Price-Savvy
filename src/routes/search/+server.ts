import { pool, dbPoolConnect } from '$lib/db';
import { json } from '@sveltejs/kit';

export async function POST(): Promise<object> {
  const client = await dbPoolConnect();
  const resultTesco = await client.query('SELECT tesco FROM autocomplete WHERE id = 1');
  const resultKaufland = await client.query('SELECT kaufland FROM autocomplete WHERE id = 1');
  const tesco: string = resultTesco.rows[0].tesco;
  const kaufland: string = resultKaufland.rows[0].kaufland;

  return json({ tesco: tesco, kaufland: kaufland });
}
