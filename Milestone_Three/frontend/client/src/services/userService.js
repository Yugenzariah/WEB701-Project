import axios from 'axios';

export const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user data", error);
        return null;
    }
};