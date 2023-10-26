import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';


export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  console.log(session);

  // TODO clean up like back in the_z0ne
  if (session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        My Post: {params.id}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Not Logged in
    </div>
  );
}