import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../lib/auth';
import pool from '../../../lib/db';
import '../../../lib/init-db';

export async function GET() {
  // const session = await auth();
  // if (!session?.user?.id) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }
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
  // const session = await auth();
  // if (!session?.user?.id) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }
    const { title, description, due_date, priority, tags } = await request.json();
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    const result = await pool.query(
      'INSERT INTO todos (title, description, due_date, priority, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description || '', due_date || null, priority || 'medium', tags || null]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    if (process.env.NODE_ENV === 'development') {
      const mockTodo = {
        id: Date.now(),
        title: 'Mock Todo (Database Unavailable)',
        description: 'This is a mock todo created because the database is not available in development.',
        due_date: null,
        priority: 'medium',
        tags: null,
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