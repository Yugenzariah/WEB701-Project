import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register user
export const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
};

// Login user
export const login = async (email, password) => {
    console.log("Attempting to login with:", email, password);
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log("Response from backend:", response.data);
    return response.data;
};

// Get user info from protected route (/me)
export const getUser = async (token) => {
    const response = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};