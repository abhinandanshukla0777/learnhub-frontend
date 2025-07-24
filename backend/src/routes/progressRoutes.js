const express = require('express');
const { getProgress, updateProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/:courseId', protect, getProgress);
router.put('/:courseId', protect, updateProgress);

module.exports = router; 