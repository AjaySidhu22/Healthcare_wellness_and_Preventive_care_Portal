const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["doctor", "patient", "admin"], required: true },

    pfp: String,

    doctorProfile: {
        patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        slots: [
            {
                date: String,
                startTime: String,
                endTime: String,
                isBooked: { type: Boolean, default: false },
                bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
            }
        ]
    },

    patientProfile: {
        goals: {
            steps: { type: Number, default: 0 },
            calories: { type: Number, default: 0 },
            sleep: { type: Number, default: 0 },
            hydration: { type: Number, default: 0 }
        },
        bookings: [
            {
                doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                date: String,
                startTime: String,
                endTime: String,
                status: {
                    type: String,
                    enum: ["upcoming", "completed", "expired", "cancelled"],
                    default: "upcoming"
                }
            }],
            upcomingCheckups: [
                {
                    test: String,
                    date: String,
                }
            ]
    }
});

module.exports = mongoose.model("User", userSchema);
