import { dbPoolConnect, pool } from '$lib/db';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST(event): Promise<object> {
  const client = await dbPoolConnect();
  const userData = await event.locals.getSession();
  const name: string | undefined | null = userData?.user?.name;
  const image: string | undefined | null = userData?.user?.image;
  const email: string | undefined | null = userData?.user?.email;
  console.log(name, email, image);

  const results = await client.query('SELECT * FROM users WHERE email = $1', [email]);
  client.release();
  console.log(results.rows);

  if (results.rows.length == 0) {
    const userInsert = await client.query(
      'INSERT INTO users (name, email, image) VALUES ($1, $2, $3)',
      [name, email, image]
    );
    client.release();
  }

  const resultsJwt = await client.query('SELECT * FROM users WHERE email = $1', [email]);
  client.release();

  interface user {
    id: number;
    name: string;
    email: string;
  }

  const user = {
    id: resultsJwt.rows[0].id,
    name: resultsJwt.rows[0].name,
    email: resultsJwt.rows[0].email
  } as user;

  const token = await jwt.sign(user, JWT_SECRET, {
    expiresIn: '24h'
  });

  const cookies = event.cookies;

  cookies.set('token', token, {
    sameSite: 'strict',
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24,
    path: '/'
  });

  return json({ name, email, image });
}
