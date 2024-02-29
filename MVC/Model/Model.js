const db = require('../DB/DB.Config');

const User = {};

User.createUser = (userData, callback) => {
  const { name, email, password, mobile, role } = userData;
  const sql = "INSERT INTO login (name, email, password, mobile, role) VALUES (?, ?, ?, ?, ?)";
  const values = [name, email, password, mobile, role];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting user into the database:', err);
      return callback(err, null);
    }
    console.log('User registered successfully:', result);
    return callback(null, result);
  });
};

User.getUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM login WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error fetching user from database:', err);
      return callback(err, null);
    }
    return callback(null, result[0]);
  });
};

module.exports = User;
