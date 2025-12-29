import pkg from 'pg';
import { env } from './env.js';

const { Pool } = pkg;

const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  database: env.db.name,
  user: env.db.user,
  password: env.db.password,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL connected successfully');
    client.release();
  } catch (error) {
    console.error('❌ PostgreSQL connection failed');
    console.error(error.message);
    process.exit(1);
  }
};

export default pool;
