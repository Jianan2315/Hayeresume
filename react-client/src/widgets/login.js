// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/login.css'; // Add CSS for styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            setMessage('Login successful');
        } catch (error) {
            setMessage('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-header">Log In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="login-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="login-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-button">Log In</button>
            </form>
            {message && <p className="login-message">{message}</p>}
        </div>
    );
};

export default Login;
