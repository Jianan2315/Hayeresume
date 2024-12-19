import React, { useState } from 'react';
import axios from 'axios';
import '../css/signup.css'; // Add CSS for styling
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BACKEND_URL}/signup`, {
                email,
                password,
                invitationCode,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error occurred while signing up');
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-header">Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="signup-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="signup-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    className="signup-input"
                    placeholder="Invitation Code (Optional)"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                />
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
            {message && <p className="signup-message">{message}</p>}
        </div>
    );
};

export default Signup;
