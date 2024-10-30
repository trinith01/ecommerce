const express = require('express');
const router = express.Router();
const db = require('../../dbconnection');

// Route to get categories with pagination support
router.get('/categories', async (req, res) => {
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100); // Limit to max of 100
  const offset = Math.max(parseInt(req.query.offset) || 0, 0); // No negative offset

  const categoriesSql = 'SELECT * FROM categories LIMIT ? OFFSET ?';
  const countSql = 'SELECT COUNT(*) AS total FROM categories';

  try {
    // Get total count of categories
    const [[{ total }]] = await db.query(countSql);

    // Get paginated categories
    const [categories] = await db.query(categoriesSql, [limit, offset]);

    res.json({
      total,
      limit,
      offset,
      categories
    });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).send('Error fetching categories');
  }
});

// Route to get products by category name
router.get('/categories/:name/products', async (req, res) => {
  const categoryName = req.params.name;
  const sql = 'CALL get_product_by_category(?)';

  try {
    const [products] = await db.query(sql, [categoryName]);
    console.log(products)

    if (products.length > 0) {
      res.json(products[0]);
    } else {
      res.status(404).send('No products found for this category');
    }
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

// Route to get product details by ID, using procedure_fetch_product_information
// Example Error Handling in Product Fetch Route
router.get('/categories/:name/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await db.query('CALL procedure_fetch_product_information(?)', [id]);

    const [productDetails, variants, categories, stockInfo] = results;

    if (productDetails.length > 0) {
      res.json({
        product: productDetails[0],
        variants,
        categories,
        stockInfo
      });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Error fetching product', details: err.message });
  }
});


// Route to search products by name with partial match
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
