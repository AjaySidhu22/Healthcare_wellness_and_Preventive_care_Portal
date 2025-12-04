const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const User = require("./models/user");
// const dotenv = require("dotenv");
// dotenv.config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");

// Middleware
const auth = require("./middleware/auth");

const app = express();


connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/admin", auth, adminRoutes);

app.use("/api/doctor", auth, doctorRoutes);

app.use("/api/patient", auth, patientRoutes);

app.get("/", (req, res) => {
  res.send("Healthcare Appointment System API Running...");
});

const PORT = 5000;


// Create default admin if not exists
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const admin = new User({
        username: "Super Admin",
        email: "admin@system.com",
        password: hashedPassword,
        role: "admin",
        pfp: ""
      });

      await admin.save();
    }
  } catch (err) {
    console.error("Error creating admin:", err);
  }
};
createDefaultAdmin();

// Runs every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();

  const patients = await User.find({ role: "patient" });

  for (const patient of patients) {
    let updated = false;

    patient.patientProfile.bookings.forEach((booking) => {
      const bookingEnd = new Date(`${booking.date}T${booking.endTime}`);

      if (booking.status === "upcoming" && bookingEnd < now) {
        booking.status = "expired";
        updated = true;
      }
    });

    if (updated) await patient.save();
  }

  console.log("⏳ Auto-expire job executed");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
