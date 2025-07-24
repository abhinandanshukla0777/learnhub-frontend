const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

exports.enroll = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const alreadyEnrolled = await Enrollment.findOne({ user: req.user._id, course: courseId });
    if (alreadyEnrolled) return res.status(400).json({ message: 'Already enrolled' });
    const enrollment = await Enrollment.create({ user: req.user._id, course: courseId });
    await Course.findByIdAndUpdate(courseId, { $addToSet: { students: req.user._id } });
    res.status(201).json(enrollment);
  } catch (err) {
    next(err);
  }
};

exports.unenroll = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    await Course.findByIdAndUpdate(enrollment.course, { $pull: { students: enrollment.user } });
    res.json({ message: 'Unenrolled' });
  } catch (err) {
    next(err);
  }
};

exports.getUserEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id }).populate('course');
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
}; 