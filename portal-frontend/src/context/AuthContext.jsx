import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Create the Context object
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  // State to hold user information (initially pulled from session storage)
  const [user, setUser] = useState(() => {
    const storedRole = sessionStorage.getItem('userRole');
    const storedToken = sessionStorage.getItem('token');
    return storedRole && storedToken ? { role: storedRole, token: storedToken } : null;
  });
  
  const navigate = useNavigate();

  // Function to handle login (simulating successful backend call)
  const login = async (credentials) => {
    // --- REAL BACKEND LOGIC GOES HERE ---
    // const response = await fetch('YOUR_BACKEND_URL/login', ...);
    // const data = await response.json();
    
    // For now, we simulate a doctor login based on a specific input, 
    // or you can modify this to always return 'doctor' for testing.
    let simulatedRole = 'patient';
    let simulatedToken = 'fake-patient-jwt';
    
    // TEMPORARY LOGIC TO TEST DOCTOR ACCESS
    if (credentials.emailOrUsername === 'doctor@hcl.com') {
        simulatedRole = 'doctor';
        simulatedToken = 'fake-doctor-jwt';
    } else if (credentials.emailOrUsername === 'patient@hcl.com') {
        simulatedRole = 'patient';
        simulatedToken = 'fake-patient-jwt';
    } else {
        // Simulate failed login
        throw new Error('Invalid credentials');
    }
    // END OF TEMPORARY LOGIC
    
    // Set the user state
    const newUser = { role: simulatedRole, token: simulatedToken };
    setUser(newUser);
    
    // Store in session storage for persistence
    sessionStorage.setItem('userRole', simulatedRole);
    sessionStorage.setItem('token', simulatedToken);
    
    // Redirect based on role
    if (simulatedRole === 'doctor') {
      navigate('/doctor/dashboard', { replace: true });
    } else {
      navigate('/patient/dashboard', { replace: true });
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  // The value exposed by the context
  const contextValue = {
    user,
    isAuthenticated: !!user, // true if user object exists
    userRole: user ? user.role : null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};