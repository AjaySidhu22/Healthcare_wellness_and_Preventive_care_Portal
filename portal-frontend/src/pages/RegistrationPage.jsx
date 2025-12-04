import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    pfp: null,   // MUST MATCH BACKEND FIELD NAME
    consent: false,
  });

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ 
      ...formData, 
      pfp: e.target.files[0] 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.consent) {
      alert("You must consent to data usage to register.");
      return;
    }

    // ---------------------------
    // UPLOAD TO BACKEND
    // ---------------------------

    // ⛔ Your backend does NOT support file upload yet.
    // So we send pfp as null until Cloudinary backend is added.

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      pfp: null // OR send a base64 string later
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Registration failed");
        return;
      }

      alert("Registration successful!");
      navigate('/login');

    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error — check console.");
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h2>HCLTech Wellness Portal</h2>
        <h1>New Patient Registration</h1>
      </header>

      <form onSubmit={handleSubmit} className="login-form">

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input 
            type="password" 
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture (Not uploaded yet)</label>
          <input 
            type="file" 
            id="profilePicture" 
            name="pfp" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          <label htmlFor="consent" className="inline-label">
            I consent to the usage of my health data for wellness tracking and preventive care.
          </label>
        </div>

        <button type="submit" className="login-button">Register Account</button>
      </form>

      <footer className="login-footer">
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </footer>
    </div>
  );
};

export default RegistrationPage;
