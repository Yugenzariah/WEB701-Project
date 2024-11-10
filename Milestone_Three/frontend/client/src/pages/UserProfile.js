import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/authService';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const userData = await getUser(token);
                setUser(userData);
            } catch (err) {
                setError('Failed to fetch user data');
            }
        };
        fetchUser();
    }, []);

    if (error) return <p className="error">{error}</p>;

    return user ? (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => navigate('/register-product')}>Register Product</button>
            <button onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
            }}>Logout</button>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default UserProfile;