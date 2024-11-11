const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const { getUserData, updateUserProfile } = require('../controllers/userController');


// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({ name, email, password, tokenBalance: 100, });
        await user.save();

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generates the JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get transaction history
router.get('/transaction-history', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('transactionHistory');
        res.status(200).json(user.transactionHistory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch transaction history', error: error.message });
    }
});

// Update user profile details
router.put('/update-profile', auth, updateUserProfile);

// Router to use auth middleware to ensure only authenticated users has access
router.get('/me', auth, getUserData);

module.exports = router;