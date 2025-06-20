const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
