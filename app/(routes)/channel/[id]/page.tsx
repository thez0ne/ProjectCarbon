import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { prisma } from '@/utils/prisma';
import ChatWindow from '@/components/channel/chatWindow';

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
        <p className='font-bold text-white text-xl'>
          Your username is: {session.user.username} and we are on channel: {params.id}
        </p>
        <ChatWindow givenUser={session.user.username} channelName='Test' currentMessages={channel?.messages as Message[]} />
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      Not Logged in
    </div>
  );
}
