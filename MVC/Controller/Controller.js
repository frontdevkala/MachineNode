const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/Model');

// Import crypto module for generating JWT secret
const crypto = require('crypto');

// Generate a random JWT secret key
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Example usage
const jwtSecret = generateJWTSecret();
console.log('JWT Secret:', jwtSecret);

const saltRounds = 10;

exports.registerUser = (req, res) => {
  const { name, email, password, mobile, role } = req.body;

  // Validate inputs
  if (!name || !email || !password || !mobile || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Hash password
  bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Error hashing password' });
    }
    // Store hashed password in database
    User.createUser({ name, email, password: hash, mobile, role }, (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ error: 'Error registering user' });
      }
      return res.json({ message: 'User registered successfully' });
    });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.getUserByEmail(email, (err, user) => {
    if (err) {
      console.error('Error fetching user from database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.json({ status: 'failed' });
    }
    // Compare password
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (match) {
        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
        return res.json({ status: 'success', token });
      } else {
        return res.json({ status: 'failed' });
      }
    });
  });
};

