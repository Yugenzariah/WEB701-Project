import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
            <button onClick={() => navigate('/user-profile')}>User Profile</button>
        </div>
    );
};

export default Navbar;
