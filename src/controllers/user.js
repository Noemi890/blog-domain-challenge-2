const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createUser = async (req, res) => {
  const { username, email, password, firstName, lastName, age, pictureUrl } = req.body

  if (!username || !email || !password ) return res.status(400).json({ error: 'Missing fields in the request body' })

  const found = await prisma.user.findFirst({
    where: {
      OR: {
      username,
      email
      }
    }
  })

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

module.exports = {
  createUser  
}