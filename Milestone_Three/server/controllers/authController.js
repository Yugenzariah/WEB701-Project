const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    console.log("Login endpoint reached");
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

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Debug: log all notifications
        console.log("All notifications:", user.notifications);

        // Retrieve unseen notifications
        const unseenNotifications = user.notifications.filter(notification => !notification.seen);
        
        res.json({
            token,
            notifications: unseenNotifications,
        });

        // Mark notifications as seen after retrieving them
        unseenNotifications.forEach(notification => {
            notification.seen = true;
        });
        await user.save();
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: 'Server error' });
    }
};