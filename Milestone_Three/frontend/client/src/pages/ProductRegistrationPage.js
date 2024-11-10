import React, { useState } from 'react';
import axios from 'axios';

const ProductRegistrationPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleProductRegistration = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/products/create',
                { name, description, price },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Product registered successfully!');
            setName('');
            setDescription('');
            setPrice('');
        } catch (err) {
            setError('Failed to register product');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Register Product/Service</h2>
                <form onSubmit={handleProductRegistration}>
                    <label>Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label>Price (in tokens)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <button type="submit">Register Product</button>
                </form>
            </div>
        </div>
    );
};

export default ProductRegistrationPage;