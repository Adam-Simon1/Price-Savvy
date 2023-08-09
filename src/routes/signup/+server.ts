import { json } from '@sveltejs/kit';
import { dbPoolConnect, pool } from '$lib/db';
import bcrypt from 'bcrypt';
import validator from 'validator';

export async function POST({ request }): Promise<object | void> {
  try {
    const client = await dbPoolConnect();

    interface form {
      username: string;
      email: string;
      password: string;
    }

    const formData = (await request.json()) as form;
    const { username, email, password } = formData;

    const queryInsert = 'INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3)';
    const queryEmail = 'SELECT * FROM accounts WHERE email = $1';

    if (username && email && password) {
      const sanitizedUsername: string = validator.escape(validator.trim(username));
      const sanitizedEmail: string = validator.normalizeEmail(validator.trim(email)) as string;

      if (sanitizedUsername.length < 3) {
        client.release();
        return json({ status: 206, message: 'Username is too short' });
      } else if (sanitizedUsername.length > 15) {
        client.release();
        return json({ status: 206, message: 'Username is too long' });
      } else if (!validator.isEmail(sanitizedEmail)) {
        client.release();
        return json({ status: 206, message: 'Invalid email address' });
      } else if (password.length < 8) {
        client.release();
        return json({ status: 206, message: 'Password must be at least 8 characters long' });
      } else if (password.length > 40) {
        client.release();
        return json({ status: 206, message: 'Password is over 40 characters' });
      } else if (!/\d/.test(password)) {
        client.release();
        return json({ status: 206, message: 'Password must contain a digit' });
      } else {
        try {
          const results = await client.query(queryEmail, [sanitizedEmail]);
          if (results.rowCount > 0) {
            client.release();
            return json({ status: 206, message: 'Email is already in use' });
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await client.query(queryInsert, [sanitizedUsername, sanitizedEmail, hashedPassword]);
            console.log('logged in successfully');

            client.release();
            return json({ status: 302, message: 'Redirecting to sign in' });
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    } else {
      client.release();
      return json({ status: 206, message: 'Missing username, email, or password' });
    }
  } catch (error) {
    pool.end();
    console.log(error);
    return json({ status: 206, message: 'An unexpected error occurred' });
  }
}
