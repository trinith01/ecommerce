const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

// Route to get products with pagination support
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;   // Number of products to load per request
  const offset = parseInt(req.query.offset) || 0;  // Offset for pagination
  
  const sql = 'SELECT * FROM products LIMIT ? OFFSET ?';

  try {
    const [results] = await db.query(sql, [limit, offset]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

module.exports = router;
