'use client';

import { Button } from '@radix-ui/themes';
import { signOut } from 'next-auth/react';

export default function LogOutButton() {
    return (
      <Button 
        onClick={async () => { 
          await signOut({ callbackUrl: '/' }); 
        }}
      > 
        Log Out
      </Button>
    );
}
