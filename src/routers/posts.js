const express = require('express')
const { createPost, getPost } = require('../controllers/post')

const router = express.Router()

router.post('/:id/posts', createPost)
router.get('/:id/posts', getPost)

module.exports = router