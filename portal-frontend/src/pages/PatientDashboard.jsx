import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();

  // Temporary function to simulate logout
  const handleLogout = () => {
    console.log("Simulating Patient Logout...");
    navigate('/', { replace: true });
  };

  // Placeholder data structure for the key metrics
  const goals = [
    { name: "Hours Slept", progress: 7.5, target: 8, unit: "hrs" },
    { name: "Calories Burnt", progress: 450, target: 500, unit: "kcal" },
    { name: "Steps Taken", progress: 8500, target: 10000, unit: "steps" },
    { name: "Water Intake", progress: 1.8, target: 2.5, unit: "L" },
  ];

  const reminders = [
    { date: "2025-01-15", test: "Annual Blood Test" },
    { date: "2025-03-01", test: "Dental Checkup" },
  ];

  return (
    <div className="patient-dashboard-layout">
      {/* --- Side Navigation Panel --- */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Patient Navigation</h2>
          <p>Welcome, Patient!</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/patient/profile" className="nav-link">My Profile</Link>
          <Link to="/patient/messages" className="nav-link">Messages Panel</Link>
          <Link to="#" onClick={handleLogout} className="nav-link logout">Logout</Link>
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="dashboard-main-content">
        <header className="dashboard-header-clean">
          <h1>Wellness & Tracking Hub</h1>
        </header>

        {/* 1. Health Goal Tracker */}
        <section className="section-card goal-tracker-grid">
          <h2>Health Goal Tracker (Today)</h2>
          {goals.map(goal => (
            <div key={goal.name} className="goal-card">
              <h3>{goal.name}</h3>
              <p className="progress-text">{goal.progress} / {goal.target} {goal.unit}</p>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                ></div>
              </div>
              <button className="log-button">Log/Edit</button>
            </div>
          ))}
        </section>

        {/* 2. Preventive Care Reminders */}
        <section className="section-card">
          <h2>Preventive Care Reminders</h2>
          {reminders.length > 0 ? (
            <ul className="reminder-list">
              {reminders.map((r, index) => (
                <li key={index}>
                  <strong>Upcoming:</strong> {r.test} (Date: {r.date})
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming preventive measures scheduled by your doctor.</p>
          )}
        </section>
        
        {/* 3. Health Tip / News */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
             <section className="section-card" style={{ flex: 1 }}>
                <h2>Health Tip of the Day (API)</h2>
                <p>Eat a rainbow of vegetables! (Auto-refreshes daily)</p>
             </section>
             <section className="section-card" style={{ flex: 1 }}>
                <h2>Messages Panel</h2>
                <p>View all alert messages and notes received from your doctor here.</p>
             </section>
        </div>
        
        {/* 4. Appointment Booking */}
        <section className="section-card">
          <h2>Appointment Booking</h2>
          <Link to="#" className="role-button patient-button">Browse Doctors & Book Appointment</Link>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;