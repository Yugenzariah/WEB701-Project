const mongoose = require('mongoose');

// Schema for users in the system
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: { type: Number, default: 10 }  // Tokens for the user
});

// Export the schema to be used in the routes
module.exports = mongoose.model('User', userSchema);