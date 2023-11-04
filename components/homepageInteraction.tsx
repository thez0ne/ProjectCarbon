'use client';

import { Flex, Button } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LogOutButton from './signOutButton';
import LogInButton from './signInButton';
import RegisterButton from './registerButton';

// TODO remove link, make buttons have on click
export default function HomepageInteraction() {
  const { data: session } = useSession();

  return (
    <div>
      {session ?
        <>
          <Flex justify='center' gap='3'>
            <LogOutButton />
            {/* TODO: Populate rooms based on db */}
            <Button>
              <Link href={'/channel/public'}>Go to Public Room</Link>
            </Button>
            {session?.user.isAdmin &&
              <Button>
                <Link href={'/channel/thez0ne'}>Go to Admin Room</Link>
              </Button>
            }
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
