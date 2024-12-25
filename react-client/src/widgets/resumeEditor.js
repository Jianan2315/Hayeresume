import { useEffect, useState } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import '../css/resumeEditor.css';

const ResumeEditor = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const responseUser = await axios.get(`${BACKEND_URL}/info`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserInfo(responseUser.data.user);
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
    }, [userInfo]);

    return (
        <div>
            <h2>Create your resume</h2>
            {userInfo ? (
                <div>
                    <iframe
                            src="/vanilla-client/edit.html"
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

export default ResumeEditor;