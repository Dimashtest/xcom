const express = require('express')
const router = express.Router()

const { getAllPosts, createPost } = require('../controllers/postsController')

router.get('/posts/', getAllPosts)
router.post('/posts/', createPost)


module.exports = router