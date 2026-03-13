const express = require('express');
const { userRagister, userLogin, getCurrentUser, profileUpdate } = require('../Controllers/UserController');
const userVarify = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/register', userRagister); 
router.post('/login', userLogin);
router.get("/profile",userVarify,getCurrentUser); 
router.post("/profile_update",userVarify,profileUpdate); 
module.exports = router;  