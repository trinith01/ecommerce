const express = require('express');
const router = express.Router();
const db = require('../dbconnection');

// Route to add product to cart
router.post('/cartpost', async (req, res) => {
    const { productId, color, quantity,email } = req.body;
    

    const sql = 'INSERT INTO cart (product_id,email, color, quantity) VALUES (?,?, ?, ?)';

    try {
        const [result] = await db.query(sql, [productId,email, color, quantity]);
        
        if (result.affectedRows > 0) {
            res.json({ message: 'Product added to cart' });
        } else {
            res.status(400).send('Failed to add product to cart');
        }
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).send('Error adding product to cart');
    }
});

module.exports = router;
