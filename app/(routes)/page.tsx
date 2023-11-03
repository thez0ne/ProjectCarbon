import Image from 'next/image';
import { Flex, Text, Heading } from '@radix-ui/themes';
import HomepageInteraction from '@/components/homepageInteraction';

export default async function Home() {
  return (
    <main className='min-h-screen p-24'>
      <Flex className='w-full' direction='row' gap='7'>
        <Image
          src='./carbonlogowbkg.svg'
          alt='Carbon App Logo'
          width={500}
          height={500}
        />
        <Flex className='w-full text-center' justify='center' direction='column' gap='6'>
          <Heading size='8'>
            Welcome to Carbon!
          </Heading>
          <Text className='text-lg' size='6' trim='both'>
            Another Alternative Chat App
          </Text>
          <Text>
            To Begin: Login or Register for an Account
          </Text>
          <HomepageInteraction />
        </Flex>
      </Flex>
    </main>
  );
}
