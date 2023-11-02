import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import { compare } from 'bcrypt';


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'DEV',
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),

    // ...add more providers here
    // taken from next-auth docs: https://next-auth.js.org/providers/credentials
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
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

        if (existingUser.password) {
          const passwordMatch = await compare(credentials.password, existingUser.password);
          if (!passwordMatch) {
            // wrong password
            console.error('incorrect password');
            return null;
          }
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
    async jwt({ token, user }) {
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
    // async signIn({ user }) {
    //   let isAllowedToSignIn = true;
    //   const allowedUser = [
    //     '12958600',
    //   ];
    //   console.log('The following user is trying to sign in: ', user);
    //   if (allowedUser.includes(String(user.id))) {
    //     isAllowedToSignIn = true;
    //   }
    //   else {
    //     isAllowedToSignIn = false;
    //   }
    //   return isAllowedToSignIn;
    // }
  }
};
