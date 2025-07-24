const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  type: { type: String, enum: ['video', 'pdf', 'quiz'], required: true },
  title: String,
  url: String, // S3 or local path
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

module.exports = mongoose.model('Content', ContentSchema); 