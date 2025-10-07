import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('Please set NEXTAUTH_SECRET environment variable');
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Please set Google OAuth credentials in environment variables');
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          // Request additional scopes for hosted domain
          scope: "openid email profile"
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/webtools/login',
    error: '/webtools/login',
  },
  callbacks: {
    async jwt({ token, account, profile }: any) {
      // Persist the OAuth access_token and hd (hosted domain) to the token right after signin
      if (account && profile) {
        token.accessToken = account.access_token;
        token.email_verified = profile.email_verified;
        token.hd = profile.hd; // Google Workspace hosted domain
      }
      return token;
    },
    async session({ session, token }: any) {
      // Send properties to the client
      if (session?.user) {
        session.user.email_verified = token.email_verified;
        session.user.hd = token.hd;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }