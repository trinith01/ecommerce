const express = require('express');
const router = express.Router();
const db = require('../dbconnection');
const authenticateToken = require('../middlewares/authMiddleware');

// POST request to create an order
router.post('/order', async (req, res) => {
  const { email, phone } = req.body;
  console.log(email, phone);

  try {
    const query = 'INSERT INTO orders (contact_email, contact_phone) VALUES (?, ?)';
    const result = await db.query(query, [email, phone]);

    res.status(201).json({ message: "Ordered successfully", result });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ message: "Error processing order" });
  }
});

// GET request to fetch orders for the authenticated user
router.get('/order', authenticateToken, async (req, res) => {
  const email = req.user.email;

  const sql = 'SELECT * FROM orders WHERE contact_email = ?';

  try {
    const [orderItems] = await db.query(sql, [email]);
    res.json(orderItems);
  } catch (err) {
    console.error('Error fetching order items:', err);
    res.status(500).json({ message: "Error fetching order items" });
  }
});

module.exports = router;
