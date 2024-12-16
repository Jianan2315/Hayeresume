// src/components/AdminPortal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPortal = () => {
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/admin', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAdminData(response.data);
        };
        fetchAdminData();
    }, []);

    return (
        <div>
            <h2>Admin Portal</h2>
            {adminData ? (
                <div>
                    <h3>Admin Data:</h3>
                    <p>{adminData}</p>
                </div>
            ) : (
                <p>Loading admin data...</p>
            )}
        </div>
    );
};

export default AdminPortal;
