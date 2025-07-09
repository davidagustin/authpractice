import pool from './db';
import fs from 'fs';
import path from 'path';

export async function initDatabase() {
  try {
    if (!pool) {
      console.log('Database connection not available (client-side or no pool)');
      return;
    }

    const schemaPath = path.join(process.cwd(), 'lib', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await pool.query(schema);
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    // Don't throw error in development - just log it
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
}

// Initialize database when this module is imported (server-side only)
if (typeof window === 'undefined') {
  initDatabase().catch(console.error);
} 