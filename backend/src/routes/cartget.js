const express = require('express');
const router = express.Router();
const db = require('../../dbconnection');
const authenticateToken = require('../middlewares/authMiddleware'); // Import the middleware

// Route to get all products in the cart
router.get('/items', authenticateToken, async (req, res) => {
    const email = req.user.email; // Get email from the authenticated user
    // const password=req.user.password;
    // console.log(password);
    // console.log(email);

    console.log(email);


    const sql = 'CALL get_cart_by_email(?)'; // Filter by user email

    try {
        // Pass the email as a parameter to the query
        const [cartItems] = await db.query(sql, ['127@gmail.com']);
        res.json(cartItems); // Return the cart items as JSON
    } catch (err) {
        console.error('Error fetching cart items:', err);
        res.status(500).send('Error fetching cart items'); // Handle errors
    }
});

// Backend route to delete a cart item by ID
router.delete('/items/:id', authenticateToken, async (req, res) => {
    const itemId = req.params.id;
    const email = req.user.email; // Get email from authenticated user

    const sql = 'CALL delete_cart_item_by_email_id(?, ?)';

    try {
        await db.query(sql, [ "127@gmail.com",itemId]);
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
        console.error('Error deleting item from cart:', err);
        res.status(500).send('Error deleting item from cart');
    }
});
router.delete('/items', authenticateToken, async (req, res) => {
    // const itemId = req.params.id;
    const email = req.user.email; // Get email from authenticated user

    const sql = 'CALL delete_cart_item_by_email(?)';

    try {
        await db.query(sql, [ '127@gmail.com']);
        res.status(200).json({ message: 'Items are removed from cart' });
    } catch (err) {
        console.error('Error deleting item from cart:', err);
        res.status(500).send('Error deleting item from cart');
    }
});

module.exports = router;