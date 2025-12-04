import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; <-- REMOVED

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    emailOrUsername: '',
    password: '',
  });
  const navigate = useNavigate();
  // const { login } = useAuth(); <-- REMOVED

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // --- PURE FRONTEND FLOW: NO AUTH, JUST REDIRECT ---
    console.log('Patient Login Attempt (Simulated):', credentials);
    
    // TEMPORARY REDIRECT FOR DEMO
    navigate('/patient/dashboard');
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h2>HCLTech Wellness Portal</h2>
        <h1>Patient Login</h1>
      </header>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input
            type="text"
            id="emailOrUsername"
            name="emailOrUsername"
            value={credentials.emailOrUsername}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>

      <footer className="login-footer">
        <p>
          New Patient? <Link to="/register">Create an Account</Link>
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;