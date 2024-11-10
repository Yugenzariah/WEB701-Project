const Product = require('../models/Products');

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