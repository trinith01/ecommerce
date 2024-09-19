const express = require('express');
const router = express.Router();
const db = require('../dbconnection'); // Import the database connection
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const saltRounds = 10; // Define the number of salt rounds for hashing

// Route to handle sign-up
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword, phone } = req.body;

  // Basic validation
  if (!name || !email || !password || !confirmPassword || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user data into the database with the hashed password
    const query = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
    await db.query(query, [name, email, hashedPassword, phone]);

    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

// Route to handle sign-in
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user exists
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(query, [email]);

    if (rows.length > 0) {
      const user = rows[0];

      // Compare the hashed password with the one provided during sign-in
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Successful sign-in
        res.status(200).json({ message: 'Sign-in successful!' });
      } else {
        // Invalid credentials
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      // User not found
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'An error occurred during sign-in' });
  }
});

module.exports = router;
