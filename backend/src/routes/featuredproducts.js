const express = require('express');
const router = express.Router();
const db = require('../../dbconnection');

// Route to get products with pagination support
router.get('/products', async (req, res) => {
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100); // Limit to a maximum of 100
  const offset = Math.max(parseInt(req.query.offset) || 0, 0); // No negative offset
  
  // const productsSql = 'CALL sp_get_products(?, ?, @total); SELECT @total as total;';
  // const countSql = 'SELECT COUNT(*) AS total FROM products';

  try {
    // Get total count of products
    // const [[{ total }]] = await db.query(countSql);
    

    // Get paginated products
    const [results] = await db.query(productsSql, [limit, offset]);

    res.json({
      total,
      limit,
      offset,
      products: results[0]
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

// Route to get a product by ID
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  const sql = 'call product_by_id(?)'; // Assuming your product table has an 'id' column

  try {
    const [[product]] = await db.query(sql, [productId]);

    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).send('Error fetching product');
  }
});

module.exports = router;
