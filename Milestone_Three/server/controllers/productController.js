const Product = require('../models/Products');
const User = require('../models/User');

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const product = new Product({
            name,
            description,
            price,
            owner: req.user.id,
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('owner', 'name');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Acquire products
exports.acquireProduct = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findById(userId);
        if (user.tokenBalance < product.price) {
            return res.status(400).json({ message: 'Insufficient tokens' });
        }

        // Deduct tokens from beneficiary and add tokens to product owner
        user.tokenBalance -= product.price;
        await user.save();

        const productOwner = await User.findById(product.owner);
        productOwner.tokenBalance += product.price;
        await productOwner.save();

        res.status(200).json({ message: 'Product acquired successfully', user });
    } catch (error) {
        console.error('Error acquiring product:', error.message);
        res.status(500).json({ message: 'Error acquiring product', error: error.message });
    }
};