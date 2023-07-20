import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }): Promise<object> {
  const token = cookies.get('token');

  if (!token) {
    return json({
      status: 401,
      body: 'Unauthorized'
    });
  }

  try {
    const decoded = (await jwt.verify(token, JWT_SECRET)) as Record<string, string>;

    if (!decoded) {
      return json({
        status: 401,
        body: 'Unauthorized'
      });
    }

    const user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username
    };

    return json({
      status: 200,
      body: user
    });
  } catch {
    return json({
      status: 403,
      body: 'Forbidden'
    });
  }
}
