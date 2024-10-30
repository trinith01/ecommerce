const express = require('express');
const router = express.Router();
const db = require('../../dbconnection');

// Route to process payment
router.post('/payment', async (req, res) => {
  let { paymentMethod, amount } = req.body;

  // Validate the inputs
  if (!paymentMethod || !amount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (paymentMethod === 'cash') {
    paymentMethod = 'Cash On Delivery'
  } else if (paymentMethod === 'card') {
    paymentMethod = 'Card'
  }

  // Ensure the amount is a valid positive number
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: "Amount must be a valid positive number." });
  }

  try {
    // Prepare and execute the query to insert payment details
    const query = 'INSERT INTO payment (payment_method, amount) VALUES (?, ?)';
    const result = await db.query(query, [paymentMethod, numericAmount]);
console.log(result);

    // Send success response
    res.status(201).json({ message: "Payment processed successfully", result });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: "Error processing payment" });
  }
});

module.exports = router;
