import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfile from './pages/UserProfile';
import ('./App.css')

function App() {
    return (
        <Router>
            <div className="heading-container">
                <h1>Welcome to YEN-Yang</h1>
            </div>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/user-profile" element={<UserProfile />} />
                    {/* This is where the default homepage will be added */}
                    <Route path="/" element={<h2>Home Page - Please select a page</h2>} />
                </Routes>
        </Router>
    );
}

export default App;