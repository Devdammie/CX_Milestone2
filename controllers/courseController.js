const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({ ...req.body, instructor: req.user._id });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate('course');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndUpdate(
      { student: req.user._id, course: req.params.id },
      { completed: true },
      { new: true }
    );
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};