const express = require('express');
const router = express.Router();
const db = require('../../dbconnection');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/order', async (req, res) => {
  const { email, phone } = req.body;

  try {
    // Prepare and execute the query to insert payment details
    const query = 'INSERT INTO orders (contact_email, contact_phone) VALUES (?, ?)';
    const result = await db.query(query, [email, phone]);

    // Send success response
    res.status(201).json({ message: "Ordered successfully", result });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ message: "Error processing order" });
  }
});

router.get('/order', authenticateToken, async (req, res) => {
    const email = req.user.email; // Get email from the authenticated user
    console.log(email);

    // const password=req.user.password;
    // console.log(password);
    // console.log(email);


    const sql = 'CALL get_order_by_email(?)' // Filter by user email

    try {
        // Pass the email as a parameter to the query
        const [orderItems] = await db.query(sql, ['john.doe@example.com']);
        res.json(orderItems); // Return the cart items as JSON
    } catch (err) {
        console.error('Error fetching order items:', err);
        res.status(500).send('Error fetching order items'); // Handle errors
    }
});



module.exports = router;
