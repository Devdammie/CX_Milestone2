const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middleware/auth');
const courseCtrl = require('../controllers/courseController');
const enrollmentCtrl = require('../controllers/enrollmentController');

router.post('/', auth, requireRole('instructor'), courseCtrl.createCourse);
router.get('/:id', auth, courseCtrl.getCourse);
router.get('/enrolled', auth, requireRole('student'), courseCtrl.getEnrolledCourses);
router.patch('/:id/complete', auth, requireRole('student'), courseCtrl.markComplete);
router.post('/:id/enroll', auth, requireRole('student'), enrollmentCtrl.enrollCourse);
router.get('/:id/students', auth, requireRole('instructor'), enrollmentCtrl.viewEnrolledStudents);

module.exports = router;