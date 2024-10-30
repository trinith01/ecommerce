const express = require('express');
const router = express.Router();
const db = require('../../dbconnection');

// Route to process payment
router.post('/payment', async (req, res) => {
  const { cardNumber, expirationDate, cvv, amount } = req.body;

  // Validate the inputs
  if (!cardNumber || !expirationDate || !cvv || !amount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Ensure the amount is a valid positive number
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Amount must be a valid positive number." });
  }

  try {
    // Prepare and execute the query to insert payment details
    const query = 'INSERT INTO payments (card_number, expiration_date, cvv, amount) VALUES (?, ?, ?, ?)';
    await db.query(query, [cardNumber, expirationDate, cvv, numericAmount]);

    // Send success response
    res.status(201).json({ message: "Payment processed successfully" });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: "Error processing payment" });
  }
});

// Route to get category names
router.get('/getcategorynames', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM category WHERE parent_category_id IS NULL');
    if (results.length > 0) {
      res.status(200).json(results); // Return the results
    } else {
      res.status(404).json({ message: 'No categories found' });
    }
  } catch (err) {
    console.error('Error fetching category names:', err.message);
    res.status(500).json({ message: 'Error fetching category names' });
  }
});

// Route to get quarterly sales
router.get('/quarterly-sales', async (req, res) => {
  const year = req.query.year;
  if (!year) {
      return res.status(400).json({ error: 'Year is required' });
  }

  // SQL query to fetch quarterly sales for the given year
  const query = `
      SELECT
        QUARTER(o.order_date) AS quarter,
        SUM(oi.quantity * v.price) AS total_sales
    FROM
        orders o
    JOIN
        order_items oi ON o.order_id = oi.order_id
    JOIN
        variant v ON oi.variant_id = v.variant_id
    WHERE
        YEAR(o.order_date) = ?
    GROUP BY
        QUARTER(o.order_date)
    ORDER BY
        quarter;
  `;

  try {
    const [results] = await db.query(query, [year]);
    res.json(results);
  } catch (err) {
      console.error('Query error:', err);
      res.status(500).json({ error: 'Database query error' });
  }
});

// Route to get most sold products within a date range
router.get('/most-sold-products', async (req, res) => {
  const { start, end } = req.query;

  // Validate date range
  if (!start || !end) {
      return res.status(400).json({ error: 'Start and end dates are required' });
  }

  // SQL query to get the most sold products in the specified date range
  const query = `
      SELECT
          p.product_id,
          pa.attribute_value AS product_name,
          SUM(oi.quantity) AS total_quantity_sold
      FROM
          orders o
      JOIN
          order_items oi ON o.order_id = oi.order_id
      JOIN
          variant v ON oi.variant_id = v.variant_id
      JOIN
          product p ON v.product_id = p.product_id
      JOIN
          product_attribute pa ON pa.product_id = p.product_id
      WHERE
          o.order_date BETWEEN ? AND ?  -- Use parameterized values for date range
      GROUP BY
          p.product_id, pa.attribute_value
      ORDER BY
          total_quantity_sold DESC
      LIMIT 10;
  `;

  try {
      const [results] = await db.query(query, [start, end]);
      res.json(results);
  } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Database query failed' });
  }
});

// Route to get category with most orders
router.get('/category-most-orders', async (req, res) => {
  // SQL query to get the category with the most orders
  const query = `
      SELECT
          c.category_id,
          c.category_name,
          COUNT(DISTINCT o.order_id) AS total_orders
      FROM
          orders o
      JOIN
          order_items oi ON o.order_id = oi.order_id
      JOIN
          variant v ON oi.variant_id = v.variant_id
      JOIN
          product p ON v.product_id = p.product_id
      JOIN
          product_category pc ON p.product_id = pc.product_id
      JOIN
          category c ON pc.category_id = c.category_id
      GROUP BY
          c.category_id, c.category_name
      ORDER BY
          total_orders DESC
      LIMIT 1;
  `;

  try {
      const [results] = await db.query(query);
      res.json(results);
  } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Database query failed' });
  }
});

// Endpoint to get product interest period
router.get('/product-interest-period', async (req, res) => {
  const { product_id, start, end } = req.query;

  if (!product_id || !start || !end) {
      return res.status(400).json({ error: 'Missing required parameters' });
  }

  const query = `
      SELECT
          DATE_FORMAT(o.order_date, '%Y-%m') AS period,
          SUM(oi.quantity) AS total_quantity_sold
      FROM
          orders o
      JOIN
          order_items oi ON o.order_id = oi.order_id
      JOIN
          variant v ON oi.variant_id = v.variant_id
      JOIN
          product p ON v.product_id = p.product_id
      WHERE
          p.product_id = ?
          AND o.order_date BETWEEN ? AND ?
      GROUP BY
          period
      ORDER BY
          total_quantity_sold DESC
      LIMIT 1;
  `;

  try {
      const results = await db.query(query, [product_id, start, end]);
      console.log(results)
      res.json(results);
  } catch (err) {
      console.error('Query error:', err);
      res.status(500).json({ error: 'Database query error' });
  }
});

// Route to get customer order report
router.get('/customer-order-report', async (req, res) => {
  const query = `
      SELECT
          o.customer_id,
          o.order_id,
          o.order_date,
          SUM(oi.quantity * v.price) AS total_amount_spent,
          GROUP_CONCAT(CONCAT(v.sku, ' (x', oi.quantity, ')') SEPARATOR ', ') AS items_purchased
      FROM
          orders o
      JOIN
          order_items oi ON o.order_id = oi.order_id
      JOIN
          variant v ON oi.variant_id = v.variant_id
      GROUP BY
          o.customer_id, o.order_id
      ORDER BY
          o.order_date DESC;
  `;

  try {
      const [results] = await db.query(query);
      res.json(results);
  } catch (err) {
      console.error('Query error:', err);
      res.status(500).json({ error: 'Database query error' });
  }
});

router.get('/category-orders', async (req, res) => {
    const query = `
      SELECT 
            c.category_name AS main_category_name,
            COUNT(o.order_id) AS total_orders
        FROM 
            category c
        JOIN 
            product_category pc ON c.category_id = pc.category_id
        JOIN 
            variant v ON v.product_id = pc.product_id
        JOIN 
            order_items oi ON oi.variant_id = v.variant_id
        JOIN 
            orders o ON o.order_id = oi.order_id
        WHERE 
            c.parent_category_id IS NULL
        GROUP BY 
            c.category_name
        ORDER BY 
            total_orders DESC;
    `;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Database query error' });
    }
  });



module.exports = router;
