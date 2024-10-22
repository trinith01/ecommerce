// routes/profile.js
const express = require('express');
const router = express.Router();
const db = require('../../dbconnection'); // Import the database connection
const verifyToken = require('../middlewares/authMiddleware');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
router.get('/protected-route', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Access granted to protected route', userId: req.userId });
});

// Route to handle sign-in
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const secretKey = 'your_secret_key'; // Use a strong secret key
const saltRounds = 10;
// Route to get user profile details
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from the request object
    // console.log(userId);

    const query = 'SELECT id, name, email, phone FROM users WHERE id = ?';
    const [rows] = await db.query(query, [userId]);

    if (rows.length > 0) {
      const user = rows[0];
      res.status(200).json({ message: 'Profile retrieved successfully', user }); // Returning user details
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'An error occurred while retrieving the profile' });
  }
});
// Route to update user profile details
router.put('/profile', verifyToken, async (req, res) => {
  const { oldPassword, newPassword, name, email, phone } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Old and new password are required' });
  }

  try {
    // Get the user from the database
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await db.query(query, [req.user.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];

    // Compare the old password with the stored hashed password
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user details in the database
    const updateQuery = 'UPDATE users SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?';
    await db.query(updateQuery, [name, email, phone, hashedPassword, req.user.userId]);

    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'An error occurred during profile update' });
  }
});



module.exports = router;
