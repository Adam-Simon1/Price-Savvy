import { json, fail } from '@sveltejs/kit';
import { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT } from '$env/static/private';
import { Client } from 'pg';
import bcrypt from 'bcrypt';
import validator from 'validator';
import Form from '../signin/Form.svelte';

const connection = new Client({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

const dbConnection = async () => {
  try {
    await connection.connect();
    console.log('Connected');
  } catch (error) {
    console.log('Error:', error);
  }
};

export const actions = {
  register: async ({ request }) => {
    await dbConnection();
    const formData = await request.formData();
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    const queryInsert = 'INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3)';
    const queryEmail = 'SELECT * FROM accounts WHERE email = $1';

    if (username && email && password) {
      const sanitizedUsername = validator.escape(validator.trim(username));
      const sanitizedEmail = validator.normalizeEmail(validator.trim(email));

      if (sanitizedUsername.length < 3) {
        return { error: 'Username is too short' };
      } else if (sanitizedUsername.length > 15) {
        return { error: 'Username is too long' };
      } else if (!validator.isEmail(sanitizedEmail)) {
        return { error: 'Invalid email address' };
      } else if (password.length < 8) {
        return { error: 'Password must be at least 8 characters long' };
      } else if (password.length > 40) {
        return { error: 'Password is over 40 characters' };
      } else if (!/\d/.test(password)) {
        return { error: 'Password must contain a digit' };
      } else {
        try {
          const results = await connection.query(queryEmail, [sanitizedEmail]);
          if (results.rowCount > 0) {
            return { error: 'Email is already in use' };
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await connection.query(queryInsert, [
              sanitizedUsername,
              sanitizedEmail,
              hashedPassword
            ]);
            console.log('logged in successfully');
            return 'Redirect', { status: 303, headers: { Location: '/login' } };
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    }
  }
};
