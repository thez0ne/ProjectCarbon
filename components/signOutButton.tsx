'use client';

import { Button } from '@radix-ui/themes';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogOutButton({ className }: { className: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  // TODO fix page not going back to home
  if (session) {
    return (
      <Button className={className} onClick={async () => { await signOut(); router.push('/'); }}> Log Out</Button>
    );
  }
}
