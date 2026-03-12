const express = require('express');
const { userRagister } = require('../Controllers/UserController');
const router = express.Router();

router.post('/register', userRagister); 

module.exports = router;