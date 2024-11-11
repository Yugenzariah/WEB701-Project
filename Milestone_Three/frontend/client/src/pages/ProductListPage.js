// client/src/pages/ProductListPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/');
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAcquire = async (productId) => {
        const token = localStorage.getItem('token');
        
        // Check if the user is logged in
        if (!token) {
            toast.error('Please log in to an account');
            return;
        }

        const confirmAcquisition = window.confirm('Are you sure you want to acquire this product?');
        if (!confirmAcquisition) return;

        try {
            const response = await axios.post(
                'http://localhost:5000/api/products/acquire',
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Display success message with summary
            const updatedTokenBalance = response.data.user.tokenBalance;
            toast.success(`Product acquired successfully! You have ${updatedTokenBalance} tokens left.`);

            // Optionally re-fetch products or user data to reflect the updated state
            fetchProducts(); // if products need updating
        } catch (err) {
            toast.error(err.response?.data.message || 'Failed to acquire product');
        }
    };

    return (
        <div className="container">
            <h2 className="product-list-heading">Available Products/Services</h2>
            {error && <p className="error">{error}</p>}
            <div className="product-list">
                {products.map((product) => (
                    <div key={product._id} className="product-item">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>Price:</strong> {product.price} tokens</p>
                        <p><strong>Owner:</strong> {product.owner.name}</p>
                        <button onClick={() => handleAcquire(product._id)}>Acquire</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;