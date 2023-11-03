'use client';

import { Link } from '@radix-ui/themes';
import LogOutButton from './signOutButton';
import LogInButton from './signInButton';
import { usePathname } from 'next/navigation';


export default function Navbar() {

  const isHome = usePathname() === '/';

  // dont render navbar on homepage
  if (isHome) return;

  return (
    <div className='w-full flex flex-row'>
      {/* NAVBAR */}
      <Link className='justify-end' href={'/'}>Home</Link>
      <LogOutButton className='justify-end' />
      <LogInButton className='justify-end' />
    </div>
  );
}
