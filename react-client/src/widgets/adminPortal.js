// src/components/AdminPortal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/adminPortal.css';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminPortal = () => {
    const [usersData, setUsersData] = useState(null);

    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${BACKEND_URL}/get/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsersData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${BACKEND_URL}/delete/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { userId: userId },
                });
                alert('User deleted successfully');
                fetchUsersData();  // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    return (
        <div className="admin-portal-container">
            <h2>Admin Portal</h2>
            {usersData ? (
                <div>
                    <h3>Users Data:</h3>
                    <table className="users-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="actions-header">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usersData.users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className="centered">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
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
