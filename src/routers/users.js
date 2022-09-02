const express = require('express')
const { createUser, updateUser } = require('../controllers/user')

const router = express.Router()

router.post('/', createUser)
router.put('/:id', updateUser)

module.exports = router