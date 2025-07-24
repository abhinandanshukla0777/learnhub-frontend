const express = require('express');
const { enroll, unenroll, getUserEnrollments } = require('../controllers/enrollController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, enroll);
router.delete('/:id', protect, unenroll);
router.get('/me', protect, getUserEnrollments);

module.exports = router; 