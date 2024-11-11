import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/user-profile">User Profile</Link>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/register-product">Register Product</Link>
            <Link to="/transaction-history">Transaction History</Link>
        </nav>
    );
};

export default Navbar;