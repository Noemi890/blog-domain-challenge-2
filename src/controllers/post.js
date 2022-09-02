const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')
const { findUserById, findCategoryByName, findPostByTitle } = require('../utils/helpers')


const createPost = async (req, res) => {
  const id = Number(req.params.id)
  const { title, content, imageUrl, publishedAt, categories } = req.body
  let date, createdPost

  const user = await findUserById(id)

  if(!user) return res.status(404).json({ error: 'A user with that ID does not exist' })

  if (!title || !content || !imageUrl || !publishedAt) return res.status(400).json({ error: 'Missing fields in the request body' })

  const postExist = await findPostByTitle(title)

  if(postExist) return res.status(409).json({ error: 'A post with the provided title already exist' })

  if (categories) {
    const found = await findCategoryByName(categories[0].name)
    date = new Date(publishedAt)

    if (found) {
      createdPost = await prisma.post.create({
        data: {
          title,
          userId: id,
          content,
          imageUrl,
          publishedAt: date,
          category: {
            connect: {
              name: categories[0].name
            }
          }
        },
        include: {
          category: true
        }
      })
    }
    else {
      createdPost = await prisma.post.create({
        data: {
          title,
          userId: id,
          content,
          imageUrl,
          publishedAt: date,
          category: {
            create: [
              { name: categories[0].name }
            ]
          }
        },
        include: {
          category: true
        }
      })
    }
  }
  else {
    createdPost = await prisma.post.create({
      data: {
        title,
        userId: id,
        content,
        imageUrl,
        publishedAt: date
      },
      include: {
        category: true
      }
    })
  }

  res.status(201).json({ post: createdPost})
}

const getPost = async (req, res) => {
  const page = Number(req.query.page)
  const perPage = Number(req.query.perPage)
  const id = Number(req.params.id)

  const user = await findUserById(id)

  if(!user) return res.status(404).json({ error: 'User with that ID does not exist' })

  const skip = (page - 1) * perPage

  const foundPosts = await prisma.post.findMany({
    skip,
    take: perPage,
    where: {
      userId: id
    },
    include: {
      category: true,
      user: {
        include: {
          profile: true
        }
      },
      comment: true
    }
  })

  console.log(foundPosts)

  res.json({ posts: foundPosts})
}

module.exports = {
  createPost, getPost
}