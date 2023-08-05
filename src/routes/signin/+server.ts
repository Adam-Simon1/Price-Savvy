import { dbPoolConnect, pool } from '$lib/db';
import { JWT_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST({ request, cookies }): Promise<object> {
  const client = await dbPoolConnect();

  interface userData {
    email: string;
    password: string;
  }

  const data = (await request.json()) as userData;
  const { email, password } = data;
  const query = 'SELECT * FROM accounts WHERE email = $1';
  if (email && password) {
    const sanitizedEmail: string = await validator.normalizeEmail(validator.trim(email));

    try {
      const results = await client.query(query, [sanitizedEmail]);
      if (results.rows.length > 0) {
        const storedHashedPassword: string = results.rows[0].password;

        const result: boolean = await bcrypt.compare(password, storedHashedPassword);

        if (result) {
          interface user {
            id: number;
            email: string;
            username: string;
          }

          const user = {
            id: results.rows[0].id,
            email: sanitizedEmail,
            username: results.rows[0].username
          } as user;

          const token = await jwt.sign(user, JWT_SECRET, {
            expiresIn: '24h'
          });

          cookies.set('token', token, {
            sameSite: 'strict',
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24
          });

          client.release();
          return json({ status: 302, message: 'Logged in successfully' });
        } else {
          client.release();
          return json({ status: 206, message: 'Incorrect email and/or password' });
        }
      } else {
        client.release();
        return json({ status: 206, message: 'Incorrect email and/or password' });
      }
    } catch (error) {
      console.log(error);
      client.release();
      return json({ status: 206, message: 'An unexpected error occurred' });
    }
  } else {
    pool.end();
    return json({ status: 206, message: 'Missing username, email, or password' });
  }
}
