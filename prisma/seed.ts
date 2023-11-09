import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.upsert({
    where: { email: 'anik_pael@live.com' },
    update: {},
    create: {
      email: 'anik_pael@live.com',
      username: 'ca',
      password: '$2b$10$ovhq5xYEZsi5KANipIVEcePru1o4Ag3/Hs1TKl8hENjHKgWYYLw4i',
    },
  });
  const newUser2 = await prisma.user.upsert({
    where: { email: 'neojixd@gmail.com' },
    update: {},
    create: {
      email: 'neojixd@gmail.com',
      username: 'fe',
      password: '$2b$10$ovhq5xYEZsi5KANipIVEcePru1o4Ag3/Hs1TKl8hENjHKgWYYLw4i',
    },
  });
  const adminUser = await prisma.user.upsert({
    where: { email: 'anik_patel@live.com' },
    update: {},
    create: {
      email: 'anik_patel@live.com',
      username: 'anik',
      password: '$2b$10$ovhq5xYEZsi5KANipIVEcePru1o4Ag3/Hs1TKl8hENjHKgWYYLw4i',
      isAdmin: true,
    },
  });

  const publicChannel = await prisma.channel.upsert({
    where: { name: 'Test' },
    update: {},
    create: {
      name: 'Test',
      uriSlug: 'public',
      messages: {
        create: [
          {
            userid: newUser.id,
            content: 'public msg1',
          },
          {
            userid: newUser2.id,
            content: 'public msg2',
          },
        ]
      }
    },
  });
  const privateChannel = await prisma.channel.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      uriSlug: 'thez0ne',
      needsAdmin: true,
      messages: {
        create: [
          {
            userid: adminUser.id,
            content: 'test message in private',
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
