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

  const createdProfile = await prisma.profile.create({
    data: {
      userId: createdUser.id,
      firstName: "Noemi",
      lastName: "Blah",
      age: 25,
      pictureUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2815&q=80"
    }
  })
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })