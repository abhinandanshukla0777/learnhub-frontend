const Thread = require('../models/Thread');
const Post = require('../models/Post');

exports.getThreads = async (req, res, next) => {
  try {
    const threads = await Thread.find({ course: req.params.courseId });
    res.json(threads);
  } catch (err) {
    next(err);
  }
};

exports.createThread = async (req, res, next) => {
  try {
    const thread = await Thread.create({
      course: req.params.courseId,
      title: req.body.title,
      posts: []
    });
    res.status(201).json(thread);
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const thread = await Thread.findById(req.params.id).populate({ path: 'posts', populate: { path: 'author', select: 'name' } });
    if (!thread) return res.status(404).json({ message: 'Thread not found' });
    res.json(thread.posts);
  } catch (err) {
    next(err);
  }
};

exports.addPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      thread: req.params.id,
      author: req.user._id,
      content: req.body.content
    });
    await Thread.findByIdAndUpdate(req.params.id, { $push: { posts: post._id } });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}; 