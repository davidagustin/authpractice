'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TodoItem from './TodoItem';
import { ListTodo, Plus } from 'lucide-react';

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

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: number, updates: Partial<Todo>) => void;
  onDeleteTodo: (id: number) => void;
}

export default function TodoList({ todos, onUpdateTodo, onDeleteTodo }: TodoListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [dueDateFilter, setDueDateFilter] = useState<string>('');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;
    if (tagFilter && (!todo.tags || !todo.tags.includes(tagFilter))) return false;
    if (dueDateFilter && todo.due_date !== dueDateFilter) return false;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  if (todos.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <ListTodo className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No todos yet</h3>
          <p className="text-muted-foreground mb-4">Add your first todo to get started!</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Plus className="h-4 w-4" />
            <span>Use the form above to create your first todo</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ListTodo className="h-5 w-5" />
            Your Todos
            <Badge variant="secondary" className="ml-2">
              {todos.length}
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
              <Badge variant="secondary" className="ml-2">
                {todos.length}
              </Badge>
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
            >
              Active
              <Badge variant="secondary" className="ml-2">
                {activeCount}
              </Badge>
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Completed
              <Badge variant="secondary" className="ml-2">
                {completedCount}
              </Badge>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="text"
            value={tagFilter}
            onChange={e => setTagFilter(e.target.value)}
            placeholder="Filter by tag"
            className="border rounded px-2 py-1"
          />
          <input
            type="date"
            value={dueDateFilter}
            onChange={e => setDueDateFilter(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="space-y-4">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={onUpdateTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </div>

        {filteredTodos.length === 0 && todos.length > 0 && (
          <div className="text-center py-8">
            <ListTodo className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No {filter} todos found.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try switching to a different filter or add new todos.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 