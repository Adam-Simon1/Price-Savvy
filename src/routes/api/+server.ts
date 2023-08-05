import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { json, redirect } from '@sveltejs/kit';
import { dbPoolConnect, pool } from '$lib/db';

export async function GET({ cookies }): Promise<object> {
  const client = await dbPoolConnect();
  const token = cookies.get('token');
  console.log(token);

  if (token !== undefined) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as Record<string, string>;

      console.log(decoded);

      if (typeof decoded === 'string') {
        client.release();
        return json({
          status: 401
        });
      }

      const results = await client.query('SELECT * FROM accounts WHERE id = $1', [decoded.id]);
      const userData = results.rows[0];
      
      const user = {
        id: userData.id,
        email: userData.email,
        username: userData.username
      };

      client.release();
      return json({
        status: 200,
        body: user.username
      });
    } catch {
      client.release();
      return json({
        status: 400
      });
    }
  } else {
    client.release();
    return json({
      status: 400
    });
  }
}
