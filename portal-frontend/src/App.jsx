import { Routes, Route } from 'react-router-dom';

// --- Import ALL Route Components ---
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DoctorLoginPage from './pages/DoctorLoginPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

// Placeholder for Public Info Page
const PublicHealthInfo = () => <h1>Public Health Information & Policy</h1>;

function App() {
  return (
    <div className="App">
      <Routes>
        {/* --- Public & Entry Routes --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/doctor-login" element={<DoctorLoginPage />} />
        <Route path="/public/health-info" element={<PublicHealthInfo />} />

        {/* --- Dashboard Routes (No Protection) --- */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        
        {/* Fallback route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;