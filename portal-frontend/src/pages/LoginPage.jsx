import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; <-- REMOVED

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
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
    fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(credentials),
})
  .then(async (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const authToken = data.token;
    const user = data.user;

    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(user));

    navigate(`/${user.role}/dashboard`);
  })
  .catch((error) => {
    navigate('/login');
    console.error('There was a problem with the login request:', error);
  });

  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h2>HCLTech Wellness Portal</h2>
        <h1>Patient Login</h1>
      </header>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
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