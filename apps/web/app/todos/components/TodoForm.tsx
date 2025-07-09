'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Loader2 } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (title: string, description: string, due_date?: string, priority?: 'low' | 'medium' | 'high', tags?: string[]) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [tags, setTags] = useState<string>('');

  const validateForm = () => {
    if (!title.trim()) {
      setTitleError('Title is required');
      return false;
    }
    if (title.trim().length > 100) {
      setTitleError('Title must be less than 100 characters');
      return false;
    }
    setTitleError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddTodo(title.trim(), description.trim(), dueDate || undefined, priority, tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setTags('');
      setTitleError('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) {
      setTitleError('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Todo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title *
            </label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter todo title..."
              required
              disabled={isSubmitting}
              className={titleError ? 'border-destructive' : ''}
            />
            {titleError && (
              <p className="text-sm text-destructive">{titleError}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter todo description (optional)..."
              rows={3}
              disabled={isSubmitting}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/500 characters
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="due_date" className="text-sm font-medium">Due Date</label>
            <Input
              id="due_date"
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              disabled={isSubmitting}
              className="w-full border rounded px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</label>
            <Input
              id="tags"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="e.g. work, urgent, home"
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Todo'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 