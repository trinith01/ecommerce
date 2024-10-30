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
router.post('/guest-cart', async (req, res) => {
    const { name, email, productId, variantId, color, quantity } = req.body;
    console.log(email);

    // if (!name || !email || !productId || !variantId || !quantity) {
    //     return res.status(400).json({ message: 'Missing required fields' });


    // }

    try {
        // Check if the guest user already exists
        // console.log('1');

        const [existingUser] = await db.query('SELECT customer_email FROM  customer  WHERE customer_email = ?', [email]);
        // console.log(existingUser.length);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Add new guest user
        // console.log('2');

        const sqlInsertUser = 'CALL add_guest_user(?, ?)';
        const [userResult] = await db.query(sqlInsertUser, [name, email]);

        const userAffectedRows = userResult?.[0]?.affectedRows || 0;
        console.log(userAffectedRows);


        if (userAffectedRows === 1) {
            return res.status(400).json({ message: 'Failed to add guest user' });
        }
        // console.log('3');

        // Add product to guest cart
        const sqlInsertCart = `
            CALL add_to_cart_email(?, ?, ?)
        `;
        const [cartResult] = await db.query(sqlInsertCart, [email, variantId, quantity]);
        // console.log(cartResult.affectedRows);


        if (cartResult.affectedRows === 1) {
            const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ message: 'Product added to cart as guest', token });
        } else {
            res.status(400).json({ message: 'Failed to add product to cart' });
        }
    } catch (err) {
        console.error('Error during guest checkout:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
