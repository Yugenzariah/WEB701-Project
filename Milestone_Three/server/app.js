const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// Register auth routes
app.use('/api/auth', authRoutes);

// Register product routes
app.use('/api/products', productRoutes);

module.exports = app;