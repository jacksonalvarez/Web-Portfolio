import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    console.log('Middleware executing for:', req.url);
    console.log('Request pathname:', req.nextUrl.pathname);
    
    // Allow access to login page without authentication
    if (req.nextUrl.pathname === '/webtools/login') {
      return NextResponse.next();
    }
    
    // For all other webtools routes, authentication is required
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log('Middleware authorization check:', { 
          token: !!token, 
          pathname: req.nextUrl.pathname 
        });
        
        // Allow login page without authentication
        if (req.nextUrl.pathname === '/webtools/login') {
          return true;
        }
        
        // Require authentication for all other webtools routes
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