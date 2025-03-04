const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')
const { findUserById, findUserWithEmailOrUsername } = require('../utils/helpers')

const createUser = async (req, res) => {
  const { username, email, password, firstName, lastName, age, pictureUrl } = req.body

  if (!username || !email || !password ) return res.status(400).json({ error: 'Missing fields in the request body' })

  const found = await findUserWithEmailOrUsername(email, username)

  if(found) return res.status(409).json({ error: 'A user with the provided username/email already exist' })

  
  const createdUser = await prisma.user.create({
    data: {
      username,
      email,
      password,
      profile: {
        create: {
          firstName,
          lastName,
          age,
          pictureUrl
        }
      }
    },
    include: {
      profile: true
    }
  })

  res.status(201).json({ user: createdUser})
  
}

const updateUser = async (req, res) => {
  const id = Number(req.params.id)
  const { username, email, password, firstName, lastName, age, pictureUrl } = req.body

  const found = await findUserById(id)

  if(!found) return res.status(404).json({ error: 'User with that ID does not exist' })

  const existingUser = await findUserWithEmailOrUsername(email, username)

  if (existingUser) return res.status(409).json({ error: 'A user with the provided username/email already exist' })

  const updatedUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      username, 
      email, 
      password, 
      profile: { 
        update: { 
          firstName, 
          lastName, 
          age, 
          pictureUrl 
        }
      }
    },
    include: {
      profile: true
    }
  })

  res.status(201).json({ user: updatedUser })
}

const deleteUser = async (req, res) => {
  const id = Number(req.params.id)

  const found = await findUserById(id)

  if(!found) return res.status(404).json({ error: 'User with that ID does not exist' })

  const deletedUser = await prisma.user.delete({
    where: {
      id
    },
    include: {
      profile: true
    }
  })

  res.status(201).json({ user: deletedUser })
}

module.exports = {
  createUser, updateUser, deleteUser
}