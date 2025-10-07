import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/webtools/login',
  },
});

export const config = {
  matcher: ['/webtools/:path*'],
};