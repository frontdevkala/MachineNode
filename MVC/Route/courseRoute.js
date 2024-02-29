const express = require('express');
const router = express.Router();
const courseController = require('../Controller/courseController');

// Multer middleware for handling file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/courses', upload.fields([{ name: 'sales_video', maxCount: 1 }, { name: 'cover_image', maxCount: 1 }]), courseController.createCourse);

module.exports = router;
