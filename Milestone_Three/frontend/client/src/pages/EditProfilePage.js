import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                toast.error("Failed to load user profile");
            }
        };
        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                'http://localhost:5000/api/auth/update-profile',
                { name, email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success("Profile updated successfully!");
            navigate('/user-profile');
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Edit Profile</h2>
                <form onSubmit={handleUpdateProfile}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;