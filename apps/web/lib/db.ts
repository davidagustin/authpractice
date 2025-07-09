import { Pool } from 'pg';

// Only create the pool on the server side
let pool: Pool | null = null;

if (typeof window === 'undefined') {
  // Server-side only
  pool = new Pool({
    host: process.env.POSTGRES_HOST || 'postgresql.postgresql.svc.cluster.local',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB || 'authpractice',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres123',
  });
}

export default pool; 