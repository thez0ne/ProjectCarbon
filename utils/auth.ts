import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { compare } from 'bcrypt';


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'DEV',
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  // Configure one or more authentication providers
  // TODO setup github
  providers: [
    // GithubProvider({
    //   id: 'github-login',
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),

    // ...add more providers here
    // taken from next-auth docs: https://next-auth.js.org/providers/credentials
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // id: 'credential-login',
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          // empty creds
          console.error('no creds given');
          return null;
        }
        
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        
        if (!existingUser) {
          // user doesnt exist
          console.error('user doesnt exist');
          return null;
        }
        
        const passwordMatch = await compare(credentials.password, existingUser.password);
        if (!passwordMatch) {
          // wrong password
          console.error('incorrect password');
          return null;
        }

        console.log('success');
        // Any object returned will be saved in `user` property of the JWT
        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          username: existingUser.username,
        };
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        }
      };
    },
  }
};
