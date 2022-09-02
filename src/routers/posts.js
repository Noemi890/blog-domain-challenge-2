const express = require('express')
const { createPost, getPost, deletePost, getAllPosts } = require('../controllers/post')

const router = express.Router()

router.post('/:id/posts', createPost)
router.get('/:id/posts', getPost)
router.delete('/:id/posts', deletePost)
router.get('/', getAllPosts)

module.exports = router