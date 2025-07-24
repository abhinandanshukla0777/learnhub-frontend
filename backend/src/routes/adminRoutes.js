const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const router = express.Router();

// TODO: Implement admin endpoints
router.get('/dashboard', protect, restrictTo('admin'), (req, res) => {
  res.json({ message: 'Admin dashboard (not implemented yet)' });
});

module.exports = router; 