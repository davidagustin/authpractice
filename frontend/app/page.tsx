import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, ListTodo } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Auth Practice</h1>
          <p className="text-muted-foreground">
            A React 19 Next.js 15 application with PostgreSQL integration
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Todo List App
            </CardTitle>
            <CardDescription>
              Manage your todos with real-time PostgreSQL synchronization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/todos">
              <Button className="w-full">
                <Database className="h-4 w-4 mr-2" />
                Open Todo List
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Built with Next.js, TypeScript, and shadcn/ui</p>
          <p>Database: PostgreSQL on Kubernetes</p>
        </div>
      </div>
    </div>
  );
} 