const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const serviceRoutes = require('../backend/routes/Services');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('MEAN Stack Backend Running');
});

app.use('/auth', authRoutes);
app.use('/services', serviceRoutes); // Add service routes

// Connect to MongoDB
mongoose.connect('mongodb+srv://Keith:<password>@web701-project.nzmvq.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});