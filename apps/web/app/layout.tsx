import '@/app/globals.css';
import { SessionProvider } from '@/components/providers/SessionProvider';

export const metadata = {
  title: 'Todo App with Auth',
  description: 'A secure todo application with user authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
