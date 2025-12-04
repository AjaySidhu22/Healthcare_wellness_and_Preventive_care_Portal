import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const constantGoals = {
  steps: 10000,
  calories: 2000,
  sleep: 8,
  hydration: 2.5,
};

const PatientDashboard = () => {
  const navigate = useNavigate();

  const [goals, setGoals] = useState(null);
  const [upcomingCheckups, setUpcomingCheckups] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ---------------------------
  // LOGOUT
  // ---------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/", { replace: true });
  };

  // ---------------------------
  // FETCH PATIENT GOALS FROM BACKEND
  // GET /api/patient/goals
  // ---------------------------
  const handleLogUpdate = async (goalName) => {
    const newValue = prompt(`Enter new progress for ${goalName}:`);

    if (!newValue || isNaN(newValue)) return alert("Invalid input");

    await fetch("http://localhost:5000/api/patient/update-goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ [goalName]: Number(newValue) }),
    });

    fetchGoals(); // refresh UI
  };

  const fetchGoals = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/patient/goals", {
        headers: { Authorization: `${token}` }
      });

      const data = await response.json();

      // ignore backend goals entirely
      setGoals(constantGoals);

      setUpcomingCheckups(data.upcomingCheckups || []);
    } catch (err) {
      console.error("Error loading patient data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchGoals();
  }, []);

  // Load on mount
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchGoals();
    }
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading dashboard...</h2>;

  if (!goals) {
    return <h2 style={{ textAlign: "center" }}>No Goals Found — Ask your doctor to set your goals.</h2>;
  }

  return (
    <div className="patient-dashboard-layout">

      {/* ------------------------ Sidebar ------------------------ */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Patient Portal</h2>
          <p>Welcome!</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/patient/profile" className="nav-link">My Profile</Link>
          <Link to="/patient/messages" className="nav-link">Messages Panel</Link>
          <Link onClick={handleLogout} className="nav-link logout">Logout</Link>
        </nav>
      </aside>

      {/* ------------------------ Main Content ------------------------ */}
      <main className="dashboard-main-content">
        <header className="dashboard-header-clean">
          <h1>Wellness & Tracking Hub</h1>
        </header>

        {/* ------------------------ GOALS ------------------------ */}
        <section className="section-card goal-tracker-grid">
          <h2>Today's Health Goals</h2>

          {Object.entries(goals).map(([key, value]) => {
            const percent = Math.min(100, Math.round((value.progress / value.target) * 100));

            const unit =
              key === "sleep" ? "hrs" :
                key === "hydration" ? "L" :
                  key === "calories" ? "kcal" :
                    "steps";

            return (
              <div key={key} className="goal-card">
                <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>

                <p className="progress-text">
                  {value.progress} / {value.target} {unit}
                </p>

                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${percent}%` }}></div>
                </div>

                <p className="percentage-text">{percent}% completed</p>

                {/* button to manually log progress */}
                <button
                  className="log-button"
                  onClick={() => handleLogUpdate(key)}
                >
                  Log Progress
                </button>
              </div>
            );
          })}
        </section>

      </main>
    </div>
  );
};

export default PatientDashboard;
