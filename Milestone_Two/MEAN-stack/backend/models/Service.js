const mongoose = require('mongoose');

// Product or service schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Service', serviceSchema);