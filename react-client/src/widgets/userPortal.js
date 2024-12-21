import { useEffect, useState } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserPortal = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [resumes, setResumes] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            const responseUser = await axios.get(`${BACKEND_URL}/info`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const responseResumes = await axios.get(`${BACKEND_URL}/get/resumes`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserInfo(responseUser.data.user);
            setResumes(responseResumes.data.resumes);
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
