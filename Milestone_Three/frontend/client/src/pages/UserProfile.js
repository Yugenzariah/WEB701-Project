import React, { useEffect, useState } from 'react';
import { getUser } from '../services/authService';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const userData = await getUser(token);
                setUser(userData);
            } catch (err) {
                setError('Failed to fetch user data, please log in');
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