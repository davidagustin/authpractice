'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { SnackbarProvider, useSnackbar } from '@/components/ui/snackbar';
import { Loader2, Database, AlertCircle } from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

function TodosPageContent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  const fetchTodos = async () => {
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
  };

  const addTodo = async (title: string, description: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
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
    fetchTodos();
  }, []);

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
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Todo List</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Database className="h-4 w-4" />
            <span>Sync with PostgreSQL database</span>
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