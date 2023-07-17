import { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT } from '$env/static/private';
import { Client, Pool } from 'pg';

export const pool = await new Pool({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

export const dbPoolConnect = async () => await pool.connect();

export const dbEnd = async () => await pool.end();
