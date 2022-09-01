const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {

  const createdUser = await prisma.user.create({
    data: {
      username: "Noemi",
      email: "notmyrealemail@email.com",
      password: "fun!"
    }
  })

  console.log('user', createdUser)
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })