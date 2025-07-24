const express = require('express');
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect, restrictTo } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, restrictTo('instructor', 'admin'), createCourse);

router.route('/:id')
  .get(getCourse)
  .put(protect, restrictTo('instructor', 'admin'), updateCourse)
  .delete(protect, restrictTo('admin'), deleteCourse);

module.exports = router; 