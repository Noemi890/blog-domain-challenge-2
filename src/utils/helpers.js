const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const findUserById = async (id) => {
  return (
    await prisma.user.findUnique({
      where: {
        id
      }
    })
  )
}

const findUserWithEmailOrUsername = async (email, username) => {
  return (
    await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })
  )
}

const findCategoryByName = async (name) => {
  return (
    await prisma.category.findFirst({
      where: {
        name
      }
    })
  )
}

const findPostByTitle = async (title) => {
  return (
    await prisma.post.findFirst({
      where: {
        title
      }
    })
  )
}

module.exports = { findUserById, findUserWithEmailOrUsername, findCategoryByName, findPostByTitle }