const express = require('express');
const router = express.Router();
const db = require('../dbconnection'); // Import the database connection

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
    console.log("okokok");
    // Insert the user data into the database
    const query = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
    await db.query(query, [name, email, password, phone]);
    console.log("ok");
    

    res.status(200).json({ message: 'Registration successful!' });
    console.log("okok");
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
    // Check if the user exists and password matches
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const [rows] = await db.query(query, [email, password]);

    if (rows.length > 0) {
      // Successful sign-in
      res.status(200).json({ message: 'Sign-in successful!' });
    } else {
      // Invalid credentials
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'An error occurred during sign-in' });
  }
});

module.exports = router;
