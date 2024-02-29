const db = require('../DB/DB.Config');

const Course = {};

Course.createCourse = (courseData, callback) => {
  const { title, category, level, faq, sales_video, cover_image } = courseData;
  const sql = "INSERT INTO courses (title, category, level, faq, sales_video, cover_image) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [title, category, level, faq, sales_video, cover_image];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting course into the database:', err);
      return callback(err, null);
    }
    console.log('Course created successfully:', result);
    return callback(null, result);
  });
};

module.exports = Course;
