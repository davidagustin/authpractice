'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SnackbarProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export function Snackbar({ message, type, duration = 5000, onClose }: SnackbarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ease-in-out',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 p-4 rounded-lg border shadow-lg',
          getStyles()
        )}
      >
        {getIcon()}
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          onClick={handleClose}
          className="text-current hover:opacity-70 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export interface SnackbarContextType {
  showSnackbar: (message: string, type: 'success' | 'error' | 'info') => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbars, setSnackbars] = useState<Array<SnackbarProps & { id: string }>>([]);

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newSnackbar = { message, type, id };
    
    setSnackbars(prev => [...prev, newSnackbar]);
  };

  const removeSnackbar = (id: string) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <div className="fixed top-0 right-0 z-50 space-y-2 p-4">
        {snackbars.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            message={snackbar.message}
            type={snackbar.type}
            onClose={() => removeSnackbar(snackbar.id)}
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
} 