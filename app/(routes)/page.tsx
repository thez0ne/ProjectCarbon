import Link from 'next/link';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      HELLO
      <Link href={'/login'}>Login</Link>
      <Link href={'/signup'}>Register</Link>
      <Link href={'/channel/public'}>Public Channel</Link>
    </main>
  );
}
