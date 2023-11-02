'use client';

import { Button } from '@radix-ui/themes';
import { signOut, useSession } from 'next-auth/react';

export default function SignOutButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Button onClick={() => { signOut(); }}> Sign Out</Button>
    );
  }
}
