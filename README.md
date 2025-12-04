 # 🏥 HCLTech Healthcare Wellness & Preventive Care Portal

## ✨ Project Overview

This project is a *Minimum Viable Product (MVP)* for a *Healthcare Wellness and Preventive Care Portal, developed as part of the HCLTech Supercharging Hackathon. It aims to seamlessly integrate front-end and back-end technologies to focus on **wellness* and *preventive care*, helping patients achieve basic health goals and maintain compliance with essential checkups.

We prioritize *security, **personalization, and **healthcare compliance*.

---

## 💻 Tech Stack & Architecture

This solution employs a modern, scalable architecture separating the frontend, backend, and data layers.

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| *Frontend* | *ReactJS/NextJS* | Chosen for building a fast, interactive, and responsive user interface. |
| *Backend* | *Python (Django/FastAPI)* or *Node.js with Express.js* | Provides a robust platform for building RESTful APIs. |
| *Database* | *NoSQL Database (e.g., MongoDB/Firestore/DynamoDB)* | Selected for flexible schema and scalability, suitable for health data and user profiles. |
| *Authentication* | *JWT (JSON Web Tokens)* & *bcrypt* | Standard for secure, stateless session management and password hashing. |
| *Deployment/CI/CD* | *Cloud Platform of Choice* (AWS/Vercel) & *GitHub Actions* | For automated testing, deployment, and scalability. |



---

## 🔑 Key Features Implemented

The portal supports *role-based access control* for two primary user types: *Patients* and *Healthcare Providers (Doctors)*.

### 1. Secure Authentication & User Management

* *Patient Registration:* Patients implement login and registration via username, email, password, and profile picture upload via *Cloudinary*. They also provide consent for data usage during registration.
* *Doctor Account Creation (Admin Only):* *Crucially, Doctors cannot self-register.* Doctor accounts are created exclusively by an *Admin* user to maintain security and ensure credential verification.
* *Session Management:* JWT with appropriate expiration for secure user sessions.
* *Password Security:* Implementation of *password hashing (bcrypt)* and other security measures.
* *Profile Management:* Patients can view and edit their profile information, including basic health details (allergies, medications).

---

### 2. Patient Dashboard & Tracking

The patient's central hub, focusing on tracking goals, appointment management, and receiving important health reminders.

| Feature | Details |
| :--- | :--- |
| *Health Goal Tracker* | Displays progress for four key metrics: *Hours Slept, **Calories Burnt, **Steps Taken, and **Water Intake*. Patients can log and edit these daily goals. |
| *Preventive Care Reminders* | Shows upcoming medical tests/checkups with dates, which are set by the assigned doctor (e.g., "Upcoming: Annual blood test..."). |
| *Health Tip of the Day* | A motivational or actionable health tip, fetched via an *External API* and auto-refreshed every 24 hours. |
| *Messages Panel* | Allows the patient to view all alert messages and notes received from their doctor. |
| *Doctor/Appointment Booking* | Patients can browse a list of available doctors and *book an appointment* by selecting an available time slot. |
| *Navigation* | Side panel includes links for *My Profile* (editing details), *Messages* (viewing doctor communications), and *Logout*. |

---

### 3. Doctor Module (Healthcare Provider View)

The Doctor's dashboard facilitates patient observation and preventive care scheduling based on established patient relationships via appointments.

* *Patient Overview:* Doctors view a list of assigned patients (i.e., patients who have successfully booked an appointment) and their compliance status (e.g., "Goal Met" or "Missed Preventive Checkup").
* *Patient Progress View:* Clicking a patient allows the doctor to see the patient's detailed health goals and compliance.
* *Preventive Measure Management:*
    * *Add/Schedule:* Doctors can *schedule new tests* for a patient, adding a preventive measure to the patient's dashboard.
    * *Compliance Action:* Doctors can mark a measure as:
        * *Ticked (Completed):* The measure is archived/deleted for both Doctor and Patient.
        * *Crossed (Missed):* The patient receives an automated alert message indicating they *failed in that measure or missed the deadline*.
* *Patient Roster Management:* Doctors can *remove* a patient from their assigned list upon the conclusion of care. *Doctors cannot add patients.*
* *Messaging:* Doctors can send *alert messages/notes* directly to patients.

---

### 4. External API Integrations

These integrations enrich the user experience and provide dynamic health information.

* *News API Integration:* Provides general news (health + regular news) for the user, displayed in dashboard tiles or notifications.
* *Health Tip of the Day API:* Fetches a daily health tip, providing motivational or actionable health guidance. *Auto-refresh is set every 24 hours.*

---

## 🛡 Security & Compliance

Given the focus on healthcare, *HIPAA compliance measures* and stringent security protocols are prioritized.

* *Secure Data Flow:* Ensuring secure data flow between frontend and backend.
* *Logging:* Implementing logging for user actions related to data access.
* *Consent:* A mandatory consent checkbox for data usage is included during patient registration.
* *Configuration:* Environment variables are configured for sensitive information.

---

## ✅ MVP Deliverables & Submission

The following core functionalities are delivered to constitute the Minimum Viable Product (MVP):

* Functional authentication system for patients and providers.
* Patient dashboard for tracking wellness goals and reminders.
* Basic goal tracker.
* Profile management for patients.
* Provider dashboard with patient compliance overview.
* Public health information page (Static page with general health information and privacy policy).
* Deployed frontend and backend applications.
* Functional CI/CD pipeline (GitHub Actions) with basic automated tests.

 
