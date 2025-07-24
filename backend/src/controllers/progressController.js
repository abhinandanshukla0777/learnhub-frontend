const Enrollment = require('../models/Enrollment');

exports.getProgress = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findOne({ user: req.user._id, course: req.params.courseId });
    if (!enrollment) return res.status(404).json({ message: 'Not enrolled in this course' });
    res.json({ progress: enrollment.progress });
  } catch (err) {
    next(err);
  }
};

exports.updateProgress = async (req, res, next) => {
  try {
    const { progress } = req.body;
    const enrollment = await Enrollment.findOneAndUpdate(
      { user: req.user._id, course: req.params.courseId },
      { progress },
      { new: true }
    );
    if (!enrollment) return res.status(404).json({ message: 'Not enrolled in this course' });
    res.json({ progress: enrollment.progress });
  } catch (err) {
    next(err);
  }
}; 