const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

// Route to add product to cart
// Route to get all products in the cart
router.get('/items', async (req, res) => {
    const sql = 'SELECT * FROM cart'; // Adjust this to your cart table structure

    try {
        const [cartItems] = await db.query(sql);
        res.json(cartItems);
    } catch (err) {
        console.error('Error fetching cart items:', err);
        res.status(500).send('Error fetching cart items');
    }
});


module.exports = router;
