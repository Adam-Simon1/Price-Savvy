import { dbPoolConnect, pool } from '$lib/db';
import { JWT_SECRET } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST({ request, cookies }) {
  const client = await dbPoolConnect();

  const data = await request.json();
  const { email, password } = data;
  const query = 'SELECT * FROM accounts WHERE email = $1';
  if (email && password) {
    const sanitizedEmail = await validator.normalizeEmail(validator.trim(email));

    try {
      const client = await pool.connect();
      const results = await client.query(query, [sanitizedEmail]);
      if (results.rows.length > 0) {
        const storedHashedPassword = results.rows[0].password;

        const result = await bcrypt.compare(password, storedHashedPassword);

        if (result) {
          const user = {
            id: results.rows[0].id,
            email: sanitizedEmail,
            username: results.rows[0].username
          };

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
