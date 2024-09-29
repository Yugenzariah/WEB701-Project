const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', async (req, res) => {
  res.send('MEAN Stack Backend Running');
});
app.use('/auth', authRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://Keith:KWZdeLGqLbpkGujb@web701-project.nzmvq.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});