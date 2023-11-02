import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.upsert({
    where: { email: 'anik_patel@live.com' },
    update: {},
    create: {
      email: 'anik_pael@live.com',
      username: 'ca',
      password: '$2b$10$ovhq5xYEZsi5KANipIVEcePru1o4Ag3/Hs1TKl8hENjHKgWYYLw4i',
    },
  });
  const newUser2 = await prisma.user.upsert({
    where: { email: 'neojinxd@gmail.com' },
    update: {},
    create: {
      email: 'neojixd@gmail.com',
      username: 'fe',
      password: '$2b$10$ovhq5xYEZsi5KANipIVEcePru1o4Ag3/Hs1TKl8hENjHKgWYYLw4i',
    },
  });

  const newChannel = await prisma.channel.upsert({
    where: { name: 'Test' },
    update: {},
    create: {
      name: 'Test',
      messages: {
        create: [
          {
            userid: newUser.id,
            // user: newUser,
            content: 'msg1',
          },
          {
            userid: newUser2.id,
            // user: newUser,
            content: 'msg2',
          },
        ]
      }
    },
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
