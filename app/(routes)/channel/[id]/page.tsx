import { authOptions } from '@/utils/auth';
import { Button } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';


export default async function Page({ params }: { params: { id: string } }) {
  // console.log(params);
  const session = await getServerSession(authOptions);
  console.log(session);

  // TODO clean up like back in the_z0ne
  if (session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        My Post: {params.id}
        {/* <Button onClick={async () => { await signOut(); }}>Sign Out</Button> */}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Not Logged in
    </div>
  );
}