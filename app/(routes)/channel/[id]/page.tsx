import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { prisma } from '@/utils/prisma';
import ChatWindow from '@/components/channel/chatWindow';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  // console.log(session);

  const channel = await prisma.channel.findUnique(
    {
      where: { uriSlug: params.id },
      select: {
        name: true,
        needsAdmin: true,
        messages: {
          select: {
            content: true,
            sentAt: true,
            user: {
              select: {
                username: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    const channels = await prisma.channel.findMany(
      {
        select: {
          name: true,
          needsAdmin: true,
          uriSlug: true,
        },
      });

  // check if user is logged in
  if (!session?.user) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        Not Logged in
      </div>
    );
  }

  // check if channel exists
  if (!channel) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        Invalid Channel
      </div>
    );
  }

  // check if user has access to channel
  if (channel.needsAdmin) {
    if (!session.user.isAdmin) {
      return (
        <div className='flex min-h-screen flex-col items-center justify-between p-24'>
          Access Denied
        </div>
      );
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-between px-6'>
      <ChatWindow givenUser={session.user} channelName={channel.name} currentMessages={channel?.messages as Message[]} availableChannels={channels} />
    </div>
  );
}
