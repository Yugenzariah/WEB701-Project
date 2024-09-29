const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: { type: Number, default: 10 }  // Tokens for the user
});

module.exports = mongoose.model('User', userSchema);