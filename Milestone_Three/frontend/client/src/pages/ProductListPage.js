import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchUserData } from '../services/userService';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/');
                setProducts(response.data);
            } catch (err) {
                setError('Failed to fetch products');
            }
        };
        fetchProducts();
    }, []);

    const handleAcquire = async (productId) => {
        const confirmAcquisition = window.confirm('Are you sure you want to acquire this product?');
        if (!confirmAcquisition) return;
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/products/acquire',
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(response.data.message);
            // Reload user data to update token balance
            fetchUserData();
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
                        <p><strong>Owner:</strong> {product.owner?.name}</p>
                        <button onClick={() => handleAcquire(product._id)}>Acquire</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;