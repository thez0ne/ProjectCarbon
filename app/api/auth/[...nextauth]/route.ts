import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/utils/prisma';
import { compare } from 'bcrypt';
import { authOptions } from '@/utils/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
