import Image from 'next/image';
import { Flex, Text, Heading } from '@radix-ui/themes';
import HomepageInteraction from '@/components/homepageInteraction';
import { prisma } from '@/utils/prisma';

export default async function Home() {

  const channels = await prisma.channel.findMany(
    {
      select: {
        name: true,
        needsAdmin: true,
        uriSlug: true,
      },
    });

  return (
    <main className='min-h-screen py-8 px-12'>
      <Flex className='w-full items-center' direction={{ md: 'row', initial: 'column'}} gap='7'>
        <Image
          src='./carbonlogowbkg.svg'
          alt='Carbon App Logo'
          height={0}
          width={0}
          className='w-[100%] md:w-[50%]'
        />
        <Flex className='w-full text-center' justify='center' direction='column' gap='6'>
          <Heading size={{ md: '8', initial: '6'}}>
            Welcome to Carbon!
          </Heading>
          <Text size={{ md: '6', initial: '4'}} trim='both'>
            Another Alternative Chat App
          </Text>
          <Text>
            To Begin: Login or Register a new Account.<br/>
            You can even Login with GitHub without registering!
          </Text>
          <HomepageInteraction availableChannels={channels} />
        </Flex>
      </Flex>
    </main>
  );
}
