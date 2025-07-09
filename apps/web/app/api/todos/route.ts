import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';
import '../../../lib/init-db';

export async function GET() {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const result = await pool.query(
      'SELECT * FROM todos ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching todos:', error);
    
    // In development, return empty array instead of error
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json([]);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const { title, description } = await request.json();
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
      [title, description || '']
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    
    // In development, return a mock response
    if (process.env.NODE_ENV === 'development') {
      const mockTodo = {
        id: Date.now(),
        title: 'Mock Todo (Database Unavailable)',
        description: 'This is a mock todo created because the database is not available in development.',
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return NextResponse.json(mockTodo, { status: 201 });
    }
    
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
} 