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
    const result = await db.query(query, [cardNumber, expirationDate, cvv, numericAmount]);

    // Send success response
    res.status(201).json({ message: "Payment processed successfully", result });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: "Error processing payment" });
  }
});

module.exports = router;
