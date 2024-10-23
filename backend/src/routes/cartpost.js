const express = require('express');
const router = express.Router();
const db = require('../../dbconnection');
const verifyToken = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const secretKey = 'your_secret_key'; // Use a strong secret key

// Protected route
router.get('/protected-route', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Access granted to protected route', userId: req.userId });
});

// Route to add product to cart
router.post('/cartpost', async (req, res) => {
    const { customerId, variantId, quantity } = req.body;


    const sql = 'CALL Procedure_Add_To_Cart(?, ?, ?)';

    try {
        const [result] = await db.query(sql, [customerId, variantId, quantity]);

        // console.log(result);

        // if (result.affectedRows > 0) {
            res.json({ message: 'Product added to cart' });
        // } else {
        //     res.status(400).send('Failed to add product to cart');
        // }
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).send('Error adding product to cart');
    }
});

// Guest cart route
// router.post('/guest-cart', async (req, res) => {
//     const { name, email, productId, color, quantity } = req.body;

//     try {
//         // Check if the user already exists
//         const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

//         if (!existingUser.length) {
//             // If user doesn't exist, create a new guest user
//             const sqlInsertUser = 'INSERT INTO users (name, email, is_guest) VALUES (?, ?, 1)';
//             await db.query(sqlInsertUser, [name, email]);
//         }

//         // Add the product to the cart
//         const sqlInsertCart = 'INSERT INTO cart (product_id, email, color, quantity) VALUES (?, ?, ?, ?)';
//         const [result] = await db.query(sqlInsertCart, [productId, email, color, quantity]);

//         if (result.affectedRows > 0) {
//             // Generate a token after successfully adding to cart
//             const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
//             res.json({ message: 'Product added to cart as guest', token });
//         } else {
//             res.status(400).send('Failed to add product to cart');
//         }
//     } catch (err) {
//         console.error('Error adding product to cart:', err);
//         res.status(500).send('Error adding product to cart');
//     }
// });

module.exports = router;
