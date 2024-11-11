import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data);
            } catch (err) {
                setError('Failed to fetch user data');
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="dashboard-container">
            <h2>User Dashboard</h2>
            {error && <p className="error">{error}</p>}
            <div className="dashboard-content">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Token Balance:</strong> {userData.tokenBalance} tokens</p>
            </div>
        </div>
    );
};

export default UserDashboard;