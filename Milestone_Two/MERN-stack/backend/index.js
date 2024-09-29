const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const tokenRoutes = require('./routes/token');
const userRoutes = require('./routes/user');
require('dotenv').config();


// Middleware
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/token', tokenRoutes);
app.use('/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
});

// Routes
app.get('/', (req, res) => {
  res.send('MERN Stack Backend Running');
});

// Listen on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});