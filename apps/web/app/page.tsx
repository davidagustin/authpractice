'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckSquare, LogIn } from 'lucide-react';

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/todos');
    }
  }, [status, router]);

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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-12">
          <div className="mb-8">
            <CheckSquare className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-2">Todo App</h1>
            <p className="text-muted-foreground">
              A secure todo application with user authentication
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={() => router.push('/auth/signin')}
              className="w-full"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 