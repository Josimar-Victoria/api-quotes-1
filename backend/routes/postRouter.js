const express = require('express')
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getAllPost
} = require('../controllers/post')
const { isAuthenticated } = require('../middleware/auth')
const router = express.Router()

router.route('/post/upload').post(isAuthenticated, createPost)

router.route('/post/').get(getAllPost)
router
  .route('/post/:id')
  .get(isAuthenticated, likeAndUnlikePost)
  .delete(isAuthenticated, deletePost)

module.exports = router
