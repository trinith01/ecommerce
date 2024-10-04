const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Same secret key used for signing tokens

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        // Save the decoded user data to the request object
        req.user = {
            userId: decoded.userId,
            email: decoded.email, // Add email to req.user
        };
        next();
    });
};

module.exports = verifyToken;
