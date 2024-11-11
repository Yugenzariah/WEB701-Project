import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import ProductListPage from './pages/ProductListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfile from './pages/UserProfile';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import UserDashboard from './pages/UserDashboard';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import EditProfilePage from './pages/EditProfilePage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="heading-container">
                <h1>Welcome to YEN-Yang</h1>
            </div>
            <div>
                <ToastContainer />
            </div>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/register-product" element={<ProductRegistrationPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/transaction-history" element={<TransactionHistoryPage />} />
                <Route path="/edit-profile" element={<EditProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;