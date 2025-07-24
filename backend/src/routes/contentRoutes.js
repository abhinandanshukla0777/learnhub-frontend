const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');

// TODO: Implement file upload and content delivery endpoints
router.post('/upload', protect, restrictTo('instructor', 'admin'), (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

module.exports = router; 