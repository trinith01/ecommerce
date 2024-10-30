const express = require('express');
const router = express.Router();
const db = require('../../dbconnection');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/order', async (req, res) => {
  const { amount, address, email, phone, deliveryMethod, paymentMethod } = req.body;
  const { line1, line2, city, District, zip } = address;

  try {
    // Prepare and execute the query to insert payment details
    const query = 'CALL add_order(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // CREATE PROCEDURE `add_order`(
    //   IN p_amount DECIMAL(5, 2),
    //   IN p_email VARCHAR(100),
    //   IN p_phone VARCHAR(100),
    //   IN p_delivery_method VARCHAR(100),
    //   IN p_payment_method VARCHAR(100),
    //   IN p_line1 VARCHAR(255),
    //   IN p_line2 VARCHAR(255),
    //   IN p_city VARCHAR(255),
    //   IN p_state VARCHAR(255),
    //   IN p_zip VARCHAR(255)
    // )

    const result = await db.query(query, [amount, email, phone, deliveryMethod, paymentMethod, line1, line2, city, District, zip]);

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
        const [orderItems] = await db.query(sql, [email]);
        res.json(orderItems); // Return the cart items as JSON
    } catch (err) {
        console.error('Error fetching order items:', err);
        res.status(500).send('Error fetching order items'); // Handle errors
    }
});



module.exports = router;
