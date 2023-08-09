import { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD } from '$env/static/private';
import pg from 'pg';
const { Pool } = pg;

export const pool = await new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

export const dbPoolConnect = async () => await pool.connect();
