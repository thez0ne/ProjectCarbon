import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    username: string,
    isAdmin: boolean,
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  */
  interface Session {
    user: User
    token: {
      username: string,
      isAdmin: boolean,
    }
  }
}
