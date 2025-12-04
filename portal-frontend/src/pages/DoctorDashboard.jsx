import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  
  // Temporary state for assigned patients
  const [patients, setPatients] = useState([
    { id: 101, name: "Alice Johnson", compliance: "Good (Goals Met)", lastCheckup: "Completed", statusColor: 'green' },
    { id: 102, name: "Bob Smith", compliance: "Alert (Missed Checkup)", lastCheckup: "Missed", statusColor: 'red' },
    { id: 103, name: "Charlie Davis", compliance: "Goals Pending", lastCheckup: "Upcoming", statusColor: 'orange' },
  ]);

  // Function to simulate navigation to patient detail view
  const viewPatientDetails = (id) => {
    alert(`Navigating to details for Patient ID: ${id}`);
    // In a full app, this would navigate to: navigate(`/doctor/patient/${id}`);
  };

  // Temporary function to simulate logout
  const handleLogout = () => {
    console.log("Simulating Doctor Logout...");
    navigate('/', { replace: true });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Doctor Dashboard: Patient Compliance Overview</h1>
        <button 
          onClick={handleLogout} 
          className="logout-button" 
        >
          Logout
        </button>
      </header>

      <section className="dashboard-content">
        <h2>Assigned Patient Roster</h2>
        
        <table className="patient-roster-table">
            <thead>
                <tr>
                    <th>Patient Name</th>
                    <th>Compliance Status</th>
                    <th>Last Preventive Action</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {patients.map(patient => (
                    <tr key={patient.id}>
                        <td>{patient.name}</td>
                        <td style={{ color: patient.statusColor, fontWeight: 'bold' }}>
                            {patient.compliance}
                        </td>
                        <td>{patient.lastCheckup}</td>
                        <td>
                            <button 
                                onClick={() => viewPatientDetails(patient.id)}
                                className="view-details-button"
                            >
                                View Details / Manage
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        <p style={{ marginTop: '20px', fontSize: '0.9em' }}>
            *Note: Doctors can manage preventive measures and send messages from the Detail view.
        </p>
      </section>
    </div>
  );
};

export default DoctorDashboard;