import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// Debug any missing environment variables
const requiredEnvVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
  }
});

const authOptions: NextAuthOptions = {
  debug: true, // Enable debug messages
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/webtools/login',
    error: '/webtools/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('Sign in callback:', { user, account, profile });
      return true;
    },
    async jwt({ token, account, profile }) {
      console.log('JWT callback:', { token, account, profile });
      if (account && profile) {
        token.accessToken = account.access_token;
        // Type assertion for Google profile properties
        token.email_verified = (profile as any).email_verified;
        token.hd = (profile as any).hd;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token });
      if (session?.user) {
        (session.user as any).email_verified = token.email_verified as boolean;
        (session.user as any).hd = token.hd as string;
        (session.user as any).accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl });
      
      // If the URL is specifically webtools/projects or contains it, redirect there
      if (url.includes('/webtools/projects') || url === '/webtools/projects') {
        const projectsUrl = `${baseUrl}/webtools/projects`;
        console.log('Redirecting to projects page:', projectsUrl);
        return projectsUrl;
      }
      
      // For webtools routes, allow them
      if (url.startsWith('/webtools') || url.includes('/webtools')) {
        if (url.startsWith('/')) {
          return `${baseUrl}${url}`;
        }
        return url.startsWith(baseUrl) ? url : `${baseUrl}/webtools/projects`;
      }
      
      // Default: redirect to projects page after successful login
      const projectsUrl = `${baseUrl}/webtools/projects`;
      console.log('Default redirect to projects page:', projectsUrl);
      return projectsUrl;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };