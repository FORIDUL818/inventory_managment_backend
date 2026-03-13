const userModel = require("../Model/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// User registration controller 

const userRagister = async (req, res) => {
    try {
        const { FirstName, LastName, email, password, role } = req.body;

        let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // Placeholder, implement proper hashing

        // Basic validation
        if (!FirstName || !LastName || !email || !hashedPassword || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        const newUser = await userModel.create({ FirstName, LastName, email, password: hashedPassword, role });
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
        let isPasswordValid = bcrypt.compareSync(password, user.password); // Placeholder, implement proper hashing
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        } 
        
        // Create JWT payload with email
        let payload = {
            email: user.email,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET, { 
            expiresIn: '24h' 
        });
        
        // Remove password from user data before sending response
        const userData = { ...user.toObject() };
        delete userData.password;
        
        res.status(200).json({ message: 'User logged in successfully', userdata: userData, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}; 

// Get current user (protected route)
const getCurrentUser = async (req, res) => {
    try {
        // Get email from headers set by authMiddleware
        const email = req.headers.email;
        
        if (!email) {
            return res.status(401).json({ message: 'Unauthorized - No email found' });
        }
        
        const user = await userModel.findOne({ email }).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ data: user });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// profile_update

let profileUpdate = async (req, res) => {
    try {
        let email = req.headers.email;
        let body = req.body;
        
        // Remove sensitive fields that shouldn't be updated
        // delete body.password;
        // delete body.role;
        // delete body.email;
        
        let query = { email: email };

        let user = await userModel.updateOne(query, { $set: body });
        
        if (user.matchedCount === 0) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }
        
        if (user.modifiedCount === 0) {
            return res.status(400).json({ status: "fail", message: "No changes made" });
        }
        
        res.status(200).json({ status: "success", message: "Profile updated successfully",data:user });
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message });
    }
};

module.exports = { 
    userRagister, 
    userLogin, 
    getCurrentUser,
    profileUpdate
};
