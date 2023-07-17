import { json } from '@sveltejs/kit';
import { dbPoolConnect, pool } from '$lib/db';
import bcrypt from 'bcrypt';
import validator from 'validator';
import Form from '../signin/Form.svelte';

export async function POST({ request }) {
  try {
    const client = await dbPoolConnect();

    const formData = await request.json();
    const { username, email, password } = formData;

    const queryInsert = 'INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3)';
    const queryEmail = 'SELECT * FROM accounts WHERE email = $1';

    if (username && email && password) {
      const sanitizedUsername = validator.escape(validator.trim(username));
      const sanitizedEmail = validator.normalizeEmail(validator.trim(email));

      if (sanitizedUsername.length < 3) {
        client.release();
        return json({ message: 'Username is too short' });
      } else if (sanitizedUsername.length > 15) {
        client.release();
        return json({ message: 'Username is too long' });
      } else if (!validator.isEmail(sanitizedEmail)) {
        client.release();
        return json({ message: 'Invalid email address' });
      } else if (password.length < 8) {
        client.release();
        return json({ message: 'Password must be at least 8 characters long' });
      } else if (password.length > 40) {
        client.release();
        return json({ message: 'Password is over 40 characters' });
      } else if (!/\d/.test(password)) {
        client.release();
        return json({ message: 'Password must contain a digit' });
      } else {
        try {
          const results = await client.query(queryEmail, [sanitizedEmail]);
          if (results.rowCount > 0) {
            client.release();
            return json({ message: 'Email is already in use' });
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await client.query(queryInsert, [sanitizedUsername, sanitizedEmail, hashedPassword]);
            console.log('logged in successfully');

            client.release();
            return new Response('Redirect', { status: 303, headers: { Location: '/signin' } });
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    } else {
      client.release();
      return json({ message: 'Missing username, email, or password' });
    }
  } catch (error) {
    pool.end();
    console.log(error);
    return json({ message: 'An unexpected error occurred' });
  }
}
