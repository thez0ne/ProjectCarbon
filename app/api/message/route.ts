import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

// TODO make sure only authenticated users can send messages

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, message, channel } = body;

    console.log(`I am ${username} received: ${message} and ${channel}`);
    
    // TODO validate message

    await prisma.message.create({
      data: {
        user: {
          connect: {
            username: username,
          },
        },
        channel: {
          connect: {
            name: channel,
          },
        },
        content: message,
      },
      include: {
        user: true,
        channel: true,
      },
    });

    return NextResponse.json({ message: 'Received!' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: `Something went horribly wrong! ${err}` }, { status: 500 });
  }
}
