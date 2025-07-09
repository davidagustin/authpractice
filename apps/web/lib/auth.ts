import NextAuth, { User, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

export const { auth, handlers } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;
        
        // Hardcoded credentials
        const HARDCODED_USERNAME = 'admin';
        const HARDCODED_PASSWORD = 'password123';
        
        if (!username || !password) {
          return null;
        }

        // Check against hardcoded credentials
        if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
          return {
            id: '1',
            username: HARDCODED_USERNAME,
            email: 'admin@example.com',
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        (session.user as { id?: string; username?: string }).id = token.id as string;
        (session.user as { id?: string; username?: string }).username = token.username as string;
      }
      return session;
    },
  },
}); 