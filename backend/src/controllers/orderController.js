const db = require('../dbconnection');

// Create a new order
exports.createOrder = async (req, res) => {
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
};

// Get orders by authenticated user
exports.getOrdersByUser = async (req, res) => {
  const email = req.user.email; // Get email from authenticated token

  const sql = 'SELECT * FROM orders WHERE contact_email = ?'; // Filter by user email

  try {
    // Pass the email as a parameter to the query
    const [orderItems] = await db.query(sql, [email]);
    res.json(orderItems); // Return the cart items as JSON
  } catch (err) {
    console.error('Error fetching order items:', err);
    res.status(500).send('Error fetching order items'); // Handle errors
  }
};
