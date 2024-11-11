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
    const buyerId = req.user.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const buyer = await User.findById(buyerId);
        if (buyer.tokenBalance < product.price) {
            return res.status(400).json({ message: 'Insufficient tokens' });
        }

        // Deduct tokens from buyer
        buyer.tokenBalance -= product.price;
        await buyer.save();

        // Add tokens to owner's balance
        const productOwner = await User.findById(product.owner);
        productOwner.tokenBalance += product.price;

        // Add a structured notification for the product owner
        const notificationMessage = `${buyer.name} bought your product "${product.name}".`;
        productOwner.notifications.push({
            type: 'purchase',
            message: notificationMessage,
            timestamp: new Date(),
        });
        await productOwner.save();

        res.status(200).json({ message: 'Product acquired successfully', user: buyer });
    } catch (error) {
        console.error('Error acquiring product:', error.message);
        res.status(500).json({ message: 'Error acquiring product', error: error.message });
    }
};