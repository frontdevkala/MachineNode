const Course = require('../Model/courseModel');
const multer = require('multer');

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' });

exports.createCourse = (req, res) => {
  const { title, category, level, faq } = req.body;
  const { sales_video, cover_image } = req.files; // Assuming files are stored in req.files

  // Validate inputs
  if (!title || !category || !level || !faq || !sales_video || !cover_image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create course
  Course.createCourse({ title, category, level, faq, sales_video: sales_video[0].path, cover_image: cover_image[0].path }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating course' });
    }
    return res.json({ message: 'Course created successfully' });
  });
};
