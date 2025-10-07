import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      email_verified?: boolean;
      hd?: string;
    } & DefaultSession['user'];
    accessToken?: string;
  }
}