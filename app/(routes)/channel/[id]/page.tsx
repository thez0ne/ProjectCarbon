import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { prisma } from '@/utils/prisma';
import ChannelInput from '@/components/channel/channelInput';
import Messages from '@/components/channel/messages';

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

// TODO setup proper channels (private and public)
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
        Your username is: {session.user.username} and we are on channel: {params.id}
        <Messages user={session.user.username} channelName='Test' />
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
