const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object containing id, email, and role
 * @returns {string} JWT token
 */
const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h' // Token expires in 24 hours
    });

    return token;
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null if invalid
 */
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};
