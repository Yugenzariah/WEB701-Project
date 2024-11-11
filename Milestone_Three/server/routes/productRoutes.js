const express = require('express');
const { createProduct, getAllProducts, acquireProduct } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a new product ( For authenticated users only)
router.post('/create', auth, createProduct);

// Route to get all products
router.get('/', getAllProducts);

// Route for acquiring products
router.post('/acquire', auth, acquireProduct);

module.exports = router;