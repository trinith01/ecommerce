const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
const db = require('../../dbconnection'); // Import the database connection
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const verifyToken = require('../middlewares/authMiddleware');

router.get('/protected-route', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Access granted to protected route', userId: req.userId });
});


const saltRounds = 10; // Define the number of salt rounds for hashing
// var sender = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'selvavinu26816@gmail.com',
//     pass: 'iasj fdld hvyl ahxd'
//   }
// });

// Route to handle sign-up
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword, phone } = req.body;
  console.log(name);

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
    const query = 'CALL register_user(?, ?, ?, ?)';
    await db.query(query, [name, email, hashedPassword, phone]);

    // Respond with success
    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Database error:', error);
    if (error.sqlState === '23000') {
      return res.status(409).json({ message: 'Email is already taken' }); // 409 Conflict
    }
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

// Route to handle sign-in
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const secretKey = 'your_secret_key'; // Use a strong secret key

// Route to handle sign-in
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user exists
    const query = 'CALL get_user_by_email(?)';
    const [rows] = await db.query(query, [email]);

    if (rows.length > 0) {
      const user = rows[0][0];
      // console.log(user);
      // Compare the hashed password with the one provided during sign-in
      if (!user.password_hash) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const match = await bcrypt.compare(password, user.password_hash);
      if (match) {
        // Generate a token valid for 1 hour
        console.log(user.customer_email);

        const token = jwt.sign({ userId: user.customer_id, email: user.customer_email }, secretKey, { expiresIn: '1h' });
        // console.log(token);


        // Send token and success message
        return res.status(200).json({ message: 'Sign-in successful!', token });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'An error occurred during sign-in' });
  }
});

module.exports = router;
