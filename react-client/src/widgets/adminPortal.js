// src/components/AdminPortal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminPortal = () => {
    const [usersData, setUsersData] = useState(null);

    useEffect(() => {
        const fetchUsersData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BACKEND_URL}/get/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsersData(response.data);
        };
        fetchUsersData();
    }, []);

    return (
        <div>
            <h2>Admin Portal</h2>
            {usersData ? (
                <div>
                    <h3>Users Data:</h3>
                    <table border="1" style={{borderCollapse: 'collapse', width: '100%'}}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usersData.users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Loading users data...</p>
            )}
        </div>
    );
};

export default AdminPortal;
