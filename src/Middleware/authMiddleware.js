const { verifyToken } = require('../Util/jwtUtils');

/**
 * Middleware to protect routes using JWT authentication
 */
const authenticateToken = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ 
            message: 'Access denied. No token provided.' 
        });
    }

    // Verify the token
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(403).json({ 
            message: 'Invalid or expired token.' 
        });
    }

    // Add user payload to request object
    req.user = decoded;
    next();
};

/**
 * Middleware to check if user has required role
 * @param {string[]} roles - Array of allowed roles
 */
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                message: 'Access denied. Please authenticate.' 
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: 'Access denied. You do not have permission.' 
            });
        }

        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRoles
};
