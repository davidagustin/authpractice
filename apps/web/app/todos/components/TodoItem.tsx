'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Edit, Save, X, AlertTriangle } from 'lucide-react';

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

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editDueDate, setEditDueDate] = useState(todo.due_date || '');
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>(todo.priority || 'medium');
  const [editTags, setEditTags] = useState<string>(todo.tags ? todo.tags.join(', ') : '');

  const handleToggleComplete = async () => {
    await onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    
    setIsUpdating(true);
    try {
      await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        due_date: editDueDate || null,
        priority: editPriority,
        tags: editTags ? editTags.split(',').map(t => t.trim()).filter(Boolean) : null,
      });
      setIsEditing(false);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditDueDate(todo.due_date || '');
    setEditPriority(todo.priority || 'medium');
    setEditTags(todo.tags ? todo.tags.join(', ') : '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    await onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Card className={`transition-all duration-200 ${
        todo.completed ? 'opacity-75 bg-gray-50' : ''
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={handleToggleComplete}
                className="mt-1"
              />
              
              {isEditing ? (
                <div className="flex-1 space-y-3">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Todo title..."
                    className="font-medium"
                    disabled={isUpdating}
                  />
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Todo description..."
                    className="min-h-[60px]"
                    disabled={isUpdating}
                  />
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={editDueDate}
                      onChange={e => setEditDueDate(e.target.value)}
                      disabled={isUpdating}
                      className="w-40"
                    />
                    <select
                      value={editPriority}
                      onChange={e => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                      disabled={isUpdating}
                      className="w-32 border rounded px-2"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <Input
                      value={editTags}
                      onChange={e => setEditTags(e.target.value)}
                      placeholder="Tags (comma separated)"
                      disabled={isUpdating}
                      className="w-48"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <h3 className={`font-medium text-lg ${
                    todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}>
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className={`mt-1 text-sm ${
                      todo.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {todo.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {todo.due_date && <Badge variant="outline" className="text-xs">Due: {todo.due_date}</Badge>}
                    {todo.priority && <Badge variant={todo.priority === 'high' ? 'destructive' : todo.priority === 'low' ? 'secondary' : 'default'} className="text-xs">{todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority</Badge>}
                    {todo.tags && todo.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 ml-4">
              {todo.completed && (
                <Badge variant="secondary" className="text-xs">
                  Completed
                </Badge>
              )}
              
              {isEditing ? (
                <>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isUpdating || !editTitle.trim()}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isUpdating}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Created: {formatDate(todo.created_at)}</span>
            {todo.updated_at !== todo.created_at && (
              <span>Updated: {formatDate(todo.updated_at)}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {showDeleteConfirm && (
        <Card className="border-destructive bg-red-50 mt-2">
          <CardContent className="flex items-center gap-2 p-4">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-destructive">Are you sure you want to delete this todo?</span>
            <div className="flex gap-2 ml-auto">
              <Button
                size="sm"
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
} 