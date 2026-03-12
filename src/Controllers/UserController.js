const userModel = require("../Model/UserModel");
const { generateToken } = require("../Util/jwtUtils");

// User registration controller 

const userRagister = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        // Basic validation
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        const newUser = await userModel.create({ username, email, password, role });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// userlogin controller

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;   
        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Check password (this is a placeholder, implement proper hashing in production)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        // Generate JWT token
        const token = generateToken(user);
        
        // Return user data (excluding password) and token
        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };
        
        res.status(200).json({ 
            message: 'User logged in successfully', 
            token,
            user: userData 
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}; 

// Get current user (protected route)
const getCurrentUser = async (req, res) => {
    try {
        // req.user is set by authenticateToken middleware
        const user = await userModel.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export the controller functions

module.exports = { 
    userRagister,
    userLogin,
    getCurrentUser
};
