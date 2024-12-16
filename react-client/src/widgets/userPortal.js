// src/components/UserPortal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPortal = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserInfo(response.data);
        };
        fetchUserInfo();
    }, []);

    return (
        <div>
            <h2>User Portal</h2>
            {userInfo ? (
                <div>
                    <h3>Your Info:</h3>
                    <p>Email: {userInfo.email}</p>
                    <p>Role: {userInfo.role}</p>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default UserPortal;
