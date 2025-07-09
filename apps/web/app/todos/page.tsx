'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { SnackbarProvider, useSnackbar } from '@/components/ui/snackbar';
import { Button } from '@/components/ui/button';
import { Loader2, Database, LogOut, User } from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  due_date?: string | null;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[] | null;
  created_at: string;
  updated_at: string;
}

function TodosPageContent() {
  const { data: session, status } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  const addTodo = async (title: string, description: string, due_date?: string, priority?: 'low' | 'medium' | 'high', tags?: string[]) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, due_date, priority, tags }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.status}`);
      }

      const newTodo = await response.json();
      setTodos(prev => [newTodo, ...prev]);
      showSnackbar('Todo added successfully!', 'success');
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to add todo', 'error');
    }
  };

  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.status}`);
      }

      const updatedTodo = await response.json();
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      showSnackbar('Todo updated successfully!', 'success');
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to update todo', 'error');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status}`);
      }

      setTodos(prev => prev.filter(todo => todo.id !== id));
      showSnackbar('Todo deleted successfully!', 'success');
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Failed to delete todo', 'error');
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchTodos();
    }
  }, [status, fetchTodos]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">Please sign in to access your todos</p>
            <Button onClick={() => window.location.href = '/auth/signin'}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading todos...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold mb-2">Todo List</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Database className="h-4 w-4" />
              <span>Sync with PostgreSQL database</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{session?.user?.username}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default function TodosPage() {
  return (
    <SnackbarProvider>
      <TodosPageContent />
    </SnackbarProvider>
  );
} 