const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

// Route to get categories with pagination support
router.get('/categories', async (req, res) => {
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100); // Limit to a maximum of 100
  const offset = Math.max(parseInt(req.query.offset) || 0, 0); // No negative offset
  
  const categoriesSql = 'SELECT * FROM categories LIMIT ? OFFSET ?';
  const countSql = 'SELECT COUNT(*) AS total FROM categories';

  try {
    // Get total count of categories
    const [[{ total }]] = await db.query(countSql);
    
    // Get paginated categories
    const [results] = await db.query(categoriesSql, [limit, offset]);

    res.json({
      total,
      limit,
      offset,
      categories: results
    });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).send('Error fetching categories');
  }
});

// Route to get products by category name
router.get('/categories/:name/products', async (req, res) => {
  const categoryName = req.params.name;

  const sql = 'SELECT * FROM products WHERE category = ?';

  try {
    const [products] = await db.query(sql, [categoryName]);

    if (products.length > 0) {
      res.json(products); // Return the array of products
    } else {
      res.status(404).send('No products found for this category');
    }
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

// Route to get product by ID
router.get('/categories/:name/products/:id', async (req, res) => {
  const { id, name } = req.params;

  const sql = 'SELECT * FROM products WHERE id = ? AND category = ?';

  try {
    const [[product]] = await db.query(sql, [id, name]);

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

// Route to search products by name
router.get('/search', async (req, res) => {
  const searchTerm = req.query.q || '';
  const sql = 'SELECT * FROM products WHERE name LIKE ?';

  try {
    const [results] = await db.query(sql, [`%${searchTerm}%`]);

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send('No products match your search');
    }
  } catch (err) {
    console.error('Error searching for products:', err);
    res.status(500).send('Error searching for products');
  }
});

module.exports = router;
