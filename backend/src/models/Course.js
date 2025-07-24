const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  image: String, // Add image field
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema); 