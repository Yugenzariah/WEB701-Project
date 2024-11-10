const express = require('express');
const { createProduct, getAllProducts } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a new product ( For authenticated users only)
router.post('/create', auth, createProduct);

// Route to get all products
router.get('/', getAllProducts);

module.exports = router;