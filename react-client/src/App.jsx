// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './widgets/navbar';
import Login from './widgets/login';
import Signup from './widgets/signup';
import UserPortal from './widgets/userPortal';
import AdminPortal from './widgets/adminPortal';
import Home from './widgets/home';
import './App.css';

function App() {
    return (
        <Router>
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/user" element={<UserPortal />} />
                    <Route path="/admin" element={<AdminPortal />} />
                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
