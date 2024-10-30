const express = require('express');
const router = express.Router();
const db = require('../../dbconnection');
const verifyToken = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Use a strong secret key

// CORS Configuration (Add this to your main app if not already configured)
const cors = require('cors');
router.use(cors());

// Protected route
router.get('/protected-route', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Access granted to protected route', userId: req.userId });
});

router.post('/cartpost', async (req, res) => {
    const { email, productId, variantId, quantity } = req.body;


    // Validate payload
    if (!email || !variantId || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const sql = 'CALL add_to_cart_email(?, ?, ?)'; // Adjust procedure params if needed

    try {
        console.log('Executing SQL:', sql);

        // Execute the stored procedure
        const [result] = await db.query(sql, [email, variantId, quantity]);
        console.log(result);


        // MySQL Procedure often returns an array of results. We check that here.
        const affectedRows = result?.[0]?.affectedRows || 0; // Check affected rows
        console.log(affectedRows);


        if (affectedRows ==0) {
            res.status(200).json({ message: 'Product added to cart' });
        } else {
            res.status(400).json({ message: 'Failed to add product to cart: No rows affected.' });
        }
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).json({ message: 'Database query failed' });
    }
});

// Guest cart route
// Guest cart route
router.post('/guest-cart', async (req, res) => {
    const { name, email, variantId, color, quantity } = req.body;

    // console.log(email,variantId,quantity);


    try {
        // Check if the user already exists
        const [existingUser] = await db.query('SELECT * FROM customer WHERE customer_email = ?', [email]);

        if (!existingUser.length) {
            // If user doesn't exist, create a new guest user
            const sqlInsertUser = 'CALL add_guest_user(?, ?)';
            await db.query(sqlInsertUser, [name, email]);
        }

        // Add the product to the cart
        const sqlInsertCart = 'CALL add_to_cart_email(?, ?, ?)';
        const [result] = await db.query(sqlInsertCart, [email, variantId, quantity]);
        // console.log(result[0]);


        if (result[0][0].affectedRows === 0) {
            // Generate a token after successfully adding to
            const token = jwt.sign({ email: email }, secretKey, { expiresIn: '1h' });
            console.log(token);

            return res.status(200).json({ message: 'Sign in as Guest!', token });
        } else {
            res.status(400).send('Failed to add product to cart');
        }
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).send('Error adding product to cart');
    }
});

module.exports = router;
