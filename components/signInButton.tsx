'use client';

import { Button } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function LogInButton({ className }: { className: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    return (
      <Button className={className} onClick={async () => { router.push('/login'); }}> Log In</Button>
    );
  }
}
