import { auth } from './lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/todos') ||
    pathname.startsWith('/api/todos')
  ) {
    if (!isLoggedIn) {
      // Redirect to sign-in page, preserving the original destination
      const signInUrl = new URL('/auth/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/todos/:path*',
    '/api/todos/:path*',
  ],
}; 