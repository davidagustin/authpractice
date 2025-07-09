'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SnackbarProvider, useSnackbar } from '@/components/ui/snackbar';

function TestSnackbarContent() {
  const { showSnackbar } = useSnackbar();
  const [count, setCount] = useState(0);

  const testSuccess = () => {
    setCount(prev => prev + 1);
    showSnackbar(`Success message ${count + 1}!`, 'success');
  };

  const testError = () => {
    setCount(prev => prev + 1);
    showSnackbar(`Error message ${count + 1}!`, 'error');
  };

  const testInfo = () => {
    setCount(prev => prev + 1);
    showSnackbar(`Info message ${count + 1}!`, 'info');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-8">Snackbar Test</h1>
        
        <div className="space-y-4">
          <Button 
            onClick={testSuccess}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Test Success Snackbar
          </Button>
          
          <Button 
            onClick={testError}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Test Error Snackbar
          </Button>
          
          <Button 
            onClick={testInfo}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Test Info Snackbar
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          Click any button to test the snackbar functionality
        </p>
      </div>
    </div>
  );
}

export default function TestSnackbarPage() {
  return (
    <SnackbarProvider>
      <TestSnackbarContent />
    </SnackbarProvider>
  );
} 