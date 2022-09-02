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

  const secondUser = await prisma.user.create({
    data: {
      username: "Blah",
      email: "blah@blah",
      password: "djsalkdjsa"
    }
  })

  console.log('user', createdUser, secondUser)

  const createdProfile = await prisma.profile.create({
    data: {
      userId: createdUser.id,
      firstName: "Noemi",
      lastName: "Blah",
      age: 25,
      pictureUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2815&q=80"
    }
  })

  const secondProfile = await prisma.profile.create({
    data: {
      userId: secondUser.id,
      firstName: "Blah",
      lastName: "Blah",
      age: 30,
      pictureUrl: "some img"
    }
  })

  console.log('profile', createdProfile, secondProfile)

  const createdPost = await prisma.post.create({
    data: {
      title: "How to lose the patience",
      content: "I'm losing my patience creating a DB",
      imageUrl: "https://images.unsplash.com/photo-1527631120902-378417754324?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      userId: createdUser.id
    }
  })

  const secondPost = await prisma.post.create({
    data: {
      title: "I'm exausted",
      content: "Today I'm feeling meh",
      imageUrl: "some img",
      userId: secondUser.id
    }
  })

  const createdComment = await prisma.comment.create({
    data: {
      userId: createdUser.id,
      postId: createdPost.id,
      content: "Really Happy! This is fun!",
      replies: {
        create: [
          {
            userId: secondUser.id,
            postId: createdPost.id,
            content: "You're crazy"
          }
        ]
      }
    },
    include: {
      replies: true
    }
  })

  const secondComment = await prisma.comment.create({
    data: {
      userId: secondUser.id,
      postId: secondPost.id,
      content: "Tell me about it",
      replies: {
        create: [
          {
            userId: createdUser.id,
            postId: secondPost.id,
            content: "I'm having a wonderful time!"
          },
          {
            userId: secondUser.id,
            postId: secondPost.id,
            content: "You can't talk, you're not real!"
          }
        ]
      }
    },
    include: {
      replies: true
    }
  })

  console.log('comment', createdComment, createdPost, secondPost, secondComment)

  const createdCategory = await prisma.category.create({
    data: {
      name: "Dev"
    }
  })

  console.log('my category', createdCategory)

}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })