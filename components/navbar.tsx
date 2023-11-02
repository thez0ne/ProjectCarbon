import { Link } from '@radix-ui/themes';
import LogOutButton from './signOutButton';
import LogInButton from './signInButton';

export default function Navbar() {

  return (
    <div className='w-full flex flex-row'>
      {/* NAVBAR */}
      <Link className='justify-end' href={'/'}>Home</Link>

      <LogOutButton className='justify-end' />
      <LogInButton className='justify-end' />
    </div>
  );
}
