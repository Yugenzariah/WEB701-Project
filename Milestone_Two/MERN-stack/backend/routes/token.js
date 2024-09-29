const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route to handle token-based transactions
router.post('/transaction', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Example: Deduct 1 token for a transaction
  if (user.tokens < 1) return res.status(400).json({ message: 'Not enough tokens' });

  user.tokens -= 1;
  await user.save();
  res.json({ message: 'Transaction successful', tokens: user.tokens });
});

module.exports = router;
