const express = require('express');
const { userRagister, userLogin, getCurrentUser } = require('../Controllers/UserController');
const { authenticateToken } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/register', userRagister); 
router.post('/login', userLogin);

// Protected route example - requires authentication
router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;