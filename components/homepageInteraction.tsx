'use client';

import { Flex, Button } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import LogOutButton from './signOutButton';
import LogInButton from './signInButton';
import RegisterButton from './registerButton';
import { useRouter } from 'next/navigation';

export default function HomepageInteraction({ availableChannels }: { availableChannels: Array<ChannelWOMessages> }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
      {session ?
        <>
          <Flex justify='center' gap='3'>
            <LogOutButton />
            {availableChannels.map((channel, index) => {
                if (!session?.user.isAdmin && channel.needsAdmin) return;
                return (
                  <Button style={{ cursor: 'pointer' }} onClick={() => { router.push(`channel/${channel.uriSlug}`); }} key={index}>
                    Go to {channel.name}
                  </Button>
                );
              }
            )}
          </Flex>
        </>
        :
        <>
          <Flex justify='center' gap='3'>
            <LogInButton />
            <RegisterButton />
          </Flex>
        </>}
    </div >
  );
}
