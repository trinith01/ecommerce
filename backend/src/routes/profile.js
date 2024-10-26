const express = require('express');
const router = express.Router();
const db = require('../dbconnection'); // Import the database connection
const verifyToken = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// Route to get user profile details
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming verifyToken sets req.user.userId

    const query = 'SELECT id, name, email, phone FROM users WHERE id = ?';
    const [rows] = await db.query(query, [userId]);

    if (rows.length > 0) {
      const user = rows[0];
      res.status(200).json({ message: 'Profile retrieved successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'An error occurred while retrieving the profile' });
  }
});

module.exports = router;
