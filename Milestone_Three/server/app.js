const express = require('express');
const cors = require ('cors');
const app = express();
const authRoutes = require('./routes/authRoutes')

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => { // Test route
    res.send('API is working');
});

app.use('/api/auth', authRoutes);

module.exports = app;