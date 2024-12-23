import { useEffect, useState } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserPortal = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [resumes, setResumes] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
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
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
    }, [userInfo]);

    useEffect(() => {
        if (resumes) {
            localStorage.setItem('resumes', JSON.stringify(resumes));
        }
    }, [resumes]);

    return (
        <div>
            <h2>User Portal</h2>
            {userInfo ? (
                <div>
                    <h3>Your Info:</h3>
                    <p>Email: {userInfo.email}</p>
                    <p>Role: {userInfo.role}</p>
                    <iframe
                        src="/vanilla-client/profile.html"
                        style={{width: '100%', height: '100vh', border: 'none'}}
                        title="Profile"
                    ></iframe>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default UserPortal;
