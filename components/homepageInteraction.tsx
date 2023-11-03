'use client';

import { Flex, Button } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import LogOutButton from './signOutButton';
import LogInButton from './signInButton';


export default function HomepageInteraction() {
  const { data: session } = useSession();
  // session?.user.isAdmin;
  // const router = useRouter();

  return (
    <div>
      {session ?
        <>
          <Flex justify='center' gap='3'>
            <LogOutButton className='justify-end' />
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
            <LogInButton className='justify-end' />
            <Button className='mx-10'>
              <Link href={'/signup'}>Register</Link>
            </Button>
          </Flex>
        </>}
    </div >
  );
}
