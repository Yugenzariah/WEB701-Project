import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductListPage from './pages/ProductListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfile from './pages/UserProfile';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import UserDashboard from './pages/UserDashboard';
import './App.css';

function App() {
    return (
        <Router>
            <div className="heading-container">
                <h1>Welcome to YEN-Yang</h1>
            </div>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/register-product" element={<ProductRegistrationPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;