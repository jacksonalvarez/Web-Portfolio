import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    console.log('Middleware executing for:', req.url);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log('Middleware authorization check:', { token });
        return !!token;
      },
    },
    pages: {
      signIn: '/webtools/login',
    },
  }
);

export const config = {
  matcher: ['/webtools/:path*'],
};