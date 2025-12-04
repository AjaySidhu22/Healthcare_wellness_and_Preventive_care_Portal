import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to the HCLTech Wellness & Preventive Care Portal</h1>
        <p>Your hub for achieving health goals and managing essential checkups.</p>
      </header>

      <div className="role-selection-grid">
        <div className="role-card patient">
          <h2>Patient Access</h2>
          <p>Log in to track goals, view reminders, and book appointments.</p>
          <Link to="/login" className="role-button patient-button">
            Patient Sign In / Register
          </Link>
        </div>

        <div className="role-card doctor">
          <h2>Healthcare Provider Access</h2>
          <p>Securely manage patient compliance and preventive measures.</p>
          <Link to="/doctor-login" className="role-button doctor-button">
            Doctor Sign In
          </Link>
        </div>
      </div>
      
      <footer className="landing-footer">
          <Link to="/public/health-info">View Health Information & Privacy Policy</Link>
      </footer>
    </div>
  );
};

export default LandingPage;