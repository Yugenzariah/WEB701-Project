import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            console.log("Data received after login:", data); // Log data to see the backend response
    
            localStorage.setItem('token', data.token);
    
            // Display notifications if there are any
            if (data.notifications && data.notifications.length > 0) {
                data.notifications.forEach((notification) => {
                    toast.info(notification.message);
                });
            }
    
            toast.success('Login successful!');
            navigate('/user-profile'); 
        } catch (err) {
            console.error("Login error:", err); // Log errors if any occur
            setError('Invalid credentials');
        }
    };    

    return (
        <div className="container">
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;