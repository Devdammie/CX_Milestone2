const Enrollment = require('../models/Enrollment');

exports.enrollCourse = async (req, res) => {
  try {
    const exists = await Enrollment.findOne({ student: req.user._id, course: req.params.id });
    if (exists) return res.status(400).json({ error: 'Already enrolled' });

    const enrollment = await Enrollment.create({ student: req.user._id, course: req.params.id });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.viewEnrolledStudents = async (req, res) => {
  try {
    const students = await Enrollment.find({ course: req.params.id }).populate('student', 'name email');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};