'use client';

import { Button } from '@radix-ui/themes';
import { signOut } from 'next-auth/react';


export default function Page({ params }: { params: { id: string } }) {
  // console.log(params);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      My Post: {params.id}
      <Button onClick={async () => { await signOut(); }}>Sign Out</Button>
    </div>
  );
}