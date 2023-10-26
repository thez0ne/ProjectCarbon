import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';

const userSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Email is invalid'),
    username: z.string().min(1, 'Username is required').max(100),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password needs more than 8 characters'),
  });

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ message: users }, { status: 200 });
}

export async function DELETE() {
  const _ = await prisma.user.deleteMany();
  return NextResponse.json({ message: 'deleted everythign' }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    // check if email exists
    if (await prisma.user.findUnique({where: {email: email}})) {
      return NextResponse.json({ user: null, message: 'User with that email already exists'}, {status: 409});
    }
    
    // check if username exists
    if (await prisma.user.findUnique({where: {username: username}})) {
      return NextResponse.json({ user: null, message: 'User with that username already exists'}, {status: 409});
    }

    const newUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: await hash(password, 10),
      },
    });

    const { password: _, ...createdUser } = newUser;

    return NextResponse.json({ user: createdUser, message: 'User Created!' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: `Something went horribly wrong! ${err}` }, { status: 500 });
  }
}
