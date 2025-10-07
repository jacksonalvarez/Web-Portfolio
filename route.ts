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

export const authOptions: NextAuthOptions = {
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
    async signIn({ user, account, profile, email, credentials }) {
      console.log('Sign in callback:', { user, account, profile });
      return true;
    },
    async jwt({ token, account, profile }) {
      console.log('JWT callback:', { token, account, profile });
      if (account && profile) {
        token.accessToken = account.access_token;
        token.email_verified = profile.email_verified;
        token.hd = profile.hd;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token });
      if (session?.user) {
        session.user.email_verified = token.email_verified;
        session.user.hd = token.hd;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl });
      
      // After successful login, always redirect to projects page
      if (url === baseUrl || url === `${baseUrl}/` || url === '/') {
        const projectsUrl = `${baseUrl}/webtools/projects`;
        console.log('Redirecting to projects page:', projectsUrl);
        return projectsUrl;
      }
      
      // If someone specifically requested /webtools/projects, allow it
      if (url === '/webtools/projects' || url === `${baseUrl}/webtools/projects`) {
        const projectsUrl = `${baseUrl}/webtools/projects`;
        console.log('Direct projects page redirect:', projectsUrl);
        return projectsUrl;
      }
      
      // Handle relative URLs
      if (url.startsWith("/")) {
        // If it's a webtools route, allow it
        if (url.startsWith("/webtools")) {
          const fullUrl = `${baseUrl}${url}`;
          console.log('Webtools route redirect:', fullUrl);
          return fullUrl;
        }
        // For other relative URLs, redirect to projects
        const projectsUrl = `${baseUrl}/webtools/projects`;
        console.log('Fallback to projects for relative URL:', projectsUrl);
        return projectsUrl;
      }

      // Handle absolute URLs that match our base
      if (url.startsWith(baseUrl)) {
        // If it's a webtools URL, allow it
        if (url.includes('/webtools')) {
          console.log('Absolute webtools URL redirect:', url);
          return url;
        }
        // Otherwise redirect to projects
        const projectsUrl = `${baseUrl}/webtools/projects`;
        console.log('Fallback to projects for absolute URL:', projectsUrl);
        return projectsUrl;
      }

      // Default fallback - redirect to projects page
      const projectsUrl = `${baseUrl}/webtools/projects`;
      console.log('Default fallback redirect to projects:', projectsUrl);
      return projectsUrl;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };