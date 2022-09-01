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

  console.log('profile', createdProfile)

  const createdPost = await prisma.post.create({
    data: {
      title: "How to lose the patience",
      content: "I'm losing my patience creating a DB",
      imageUrl: "https://images.unsplash.com/photo-1527631120902-378417754324?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      userId: createdUser.id
    }
  })

  const createdComment = await prisma.comment.create({
    data: {
      userId: createdUser.id,
      postId: createdPost.id,
      content: "Really Happy! This is fun!"
    }
  })

  console.log('comment', createdComment, createdPost)

}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })