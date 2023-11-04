'use client';

import Image from 'next/image';
import { Avatar, Box, Flex, Link, Popover, Text } from '@radix-ui/themes';
import LogOutButton from './signOutButton';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';


export default function Navbar() {
  const { data: session } = useSession();

  const isHome = usePathname() === '/';
  // dont render navbar on homepage
  if (isHome) return;

  const user = session?.user!;
  const image = user?.image;
  const letter = user?.username[0];

  return (
    <div className='w-full border-b-2 border-neutral-600'>
      {/* NAVBAR */}
      <Flex className='p-4' direction='row' justify='between'>

        <Link href={'/'}>
          <Flex direction='row' gap='3'>
            <Image
              src='/carbonlogowbkg.svg'
              alt='Carbon App Logo'
              width={50}
              height={50}
            />
            {/* TODO Text here refuses to be centered vertically */}
            <Text size='6' weight='bold'>Carbon</Text>
          </Flex>
        </Link>

        {/* if user is not defined, aka not logged in, then dont render profile card */}
        {!user ? 
          <></>
          :
          <Popover.Root>
            <Popover.Trigger className='cursor-pointer'>
              <Flex direction='row' gap='3'>
                {/* TODO Text here refuses to be centered vertically */}
                <Text size='5' weight='bold'>{user.name ? user.name : user.username}</Text>
                <Avatar
                  size='4'
                  src={`${image}`}
                  fallback={`${letter}`}
                  />
              </Flex>
            </Popover.Trigger>
            <Popover.Content style={{ width: 300 }}>
              <Flex direction='column' gap='3' justify='between'>
                <Box grow='1'>
                  <Flex direction='row' gap='3' justify='between'>
                    <Avatar
                      size='6'
                      src={`${image}`}
                      fallback={`${letter}`}
                      radius='full'
                    />
                    <Flex direction='column' justify='between'>
                      {user.name && <Text size='6' weight='bold' align='right'>{user.name}</Text>}
                      <Text size='5' weight='medium' align='right'>{user.username}</Text>
                      <Text size='3' align='right'>{user.email}</Text>
                    </Flex>
                  </Flex>
                </Box>
                
                <LogOutButton />
              </Flex>
            </Popover.Content>
          </Popover.Root>
        }
      </Flex>
    </div>
  );
}
