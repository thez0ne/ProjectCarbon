import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { prisma } from '@/utils/prisma';
import { Button, TextField } from '@radix-ui/themes';
import ChannelInput from '@/components/channel/channelInput';

type user = {
  username: string,
}

type message = {
  content: string,
  user: user,
  sentAt: Date,
};

type channel = {
  messages: message[],
  name: string,
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  console.log(session);

  const channel = await prisma.channel.findUnique(
    {
      where: { name: 'Test' },
      select: {
        name: true,
        messages: {
          select: {
            content: true,
            sentAt: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

  // TODO clean up like back in the_z0ne
  if (session?.user) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        My Post: {params.id}
        <div>
          {channel?.messages.map((element: message, index: number) => (
            <div className='mb-8' key={index}>
              <p>sent by: {element.user.username}</p>
              <p>content: {element.content}</p>
              <p>Sent At: {element.sentAt.toString()}</p>
            </div>
          ))}
        </div>
        <ChannelInput user={session.user.username} channelName='Test' />
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      Not Logged in
    </div>
  );
}
