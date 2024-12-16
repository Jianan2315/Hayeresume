// widgets/Home.jsx
import React from 'react';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        // Perform any logic here, then navigate
        console.log('Navigating to login...');
        navigate('/login');
    };

    return (
        <div className="home-container">
            <section className="hero-section">
                <h1>Create Your Perfect Resume</h1>
                <p>Design and build a professional resume in minutes with our easy-to-use platform.</p>
                <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
            </section>

            <section className="features-section">
                <h2>Why Choose Resume Builder?</h2>
                <div className="features">
                    <div className="feature">
                        <h3>Easy to Use</h3>
                        <p>Create resumes with our intuitive editor—no experience required!</p>
                    </div>
                    <div className="feature">
                        <h3>Customizable Templates</h3>
                        <p>Choose from a variety of professional templates to make your resume stand out.</p>
                    </div>
                    <div className="feature">
                        <h3>Download as PDF</h3>
                        <p>Export your resume in PDF format for easy sharing.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
