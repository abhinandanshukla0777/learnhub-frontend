const express = require('express');
const { getThreads, createThread, getPosts, addPost } = require('../controllers/forumController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/:courseId')
  .get(getThreads)
  .post(protect, createThread);

router.route('/thread/:id')
  .get(getPosts)
  .post(protect, addPost);

module.exports = router; 