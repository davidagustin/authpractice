import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const updates = await request.json();
    const { id } = await params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    // First, get the current todo to merge with updates
    const currentResult = await pool.query(
      'SELECT * FROM todos WHERE id = $1',
      [todoId]
    );

    if (currentResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    const currentTodo = currentResult.rows[0];

    // Merge updates with current values, only updating provided fields
    const mergedUpdates = {
      title: updates.title !== undefined && updates.title !== null ? updates.title : currentTodo.title,
      description: updates.description !== undefined ? updates.description : currentTodo.description,
      completed: updates.completed !== undefined ? updates.completed : currentTodo.completed,
    };

    // Validate that title is not empty
    if (!mergedUpdates.title || mergedUpdates.title.trim() === '') {
      return NextResponse.json(
        { error: 'Title cannot be empty' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'UPDATE todos SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [mergedUpdates.title, mergedUpdates.description, mergedUpdates.completed, todoId]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating todo:', error);
    
    // In development, return a mock response
    if (process.env.NODE_ENV === 'development') {
      const mockTodo = {
        id: parseInt((await params).id),
        title: 'Mock Updated Todo',
        description: 'This is a mock updated todo because the database is not available in development.',
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return NextResponse.json(mockTodo);
    }
    
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const { id } = await params;
    const todoId = parseInt(id);

    if (isNaN(todoId)) {
      return NextResponse.json(
        { error: 'Invalid todo ID' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [todoId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    
    // In development, return success
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ message: 'Mock todo deleted successfully' });
    }
    
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
} 