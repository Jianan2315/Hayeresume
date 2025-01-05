import { useEffect, useState } from 'react';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import '../css/resumeEditor.css';
import { useLocation } from 'react-router-dom';

const ResumeEditor = () => {
    const [userInfo, setUserInfo] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const templateId = queryParams.get('template');
    const id = queryParams.get('id');

    useEffect(() => {
        const iframe = document.querySelector('iframe');
        if (iframe && templateId && id) {
            iframe.src = `/vanilla-client/edit.html?template=${templateId}&id=${id}`;
        }
    }, [templateId, id]);

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
                        src="/vanilla-client/edit.html?template=${templateId}&id=${id}"
                        style={{width: '100%', height: '100vh', border: 'none'}}
                        title="Editor"
                    ></iframe>
                </div>
            ) : (
                <p>Please login in first.</p>
            )}
        </div>
    );
};

export default ResumeEditor;