const express = require("express");
const router = express.Router();

const User = require("../models/user");

const auth = require("../middleware/auth");
const patientOnly = require("../middleware/patientOnly");

/*
|--------------------------------------------------------------------------
| 1. Patient appoints a doctor
|--------------------------------------------------------------------------
*/
router.post("/appoint-doctor", auth, patientOnly, async (req, res) => {
  try {
    const { doctorId } = req.body;
    const patientId = req.userId;

    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    // Add patient to doctor list if not already
    if (!doctor.doctorProfile.patients.includes(patientId)) {
      doctor.doctorProfile.patients.push(patientId);
      await doctor.save();
    }

    res.json({ msg: "Doctor appointed successfully", doctor });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
|--------------------------------------------------------------------------
| 2. Show Patient Goals
|--------------------------------------------------------------------------
*/
router.get("/goals", auth, patientOnly, async (req, res) => {
  try {
    const patient = await User.findById(req.userId).select(
      "username patientProfile.goals patientProfile.upcomingCheckups"
    );

    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    res.json({
      username: patient.username,
      goals: patient.patientProfile.goals,
      upcomingCheckups: patient.patientProfile.upcomingCheckups,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
|--------------------------------------------------------------------------
| (Optional Bonus) 3. Update Patient Goals
|--------------------------------------------------------------------------
*/
router.post("/update-goals", auth, patientOnly, async (req, res) => {
  try {
    const { steps, calories, sleep, hydration } = req.body;

    const patient = await User.findById(req.userId);

    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    // Update progress only
    if (steps !== undefined) patient.patientProfile.goals.steps.progress = steps;
    if (calories !== undefined) patient.patientProfile.goals.calories.progress = calories;
    if (sleep !== undefined) patient.patientProfile.goals.sleep.progress = sleep;
    if (hydration !== undefined) patient.patientProfile.goals.hydration.progress = hydration;

    await patient.save();

    res.json({
      msg: "Progress updated successfully",
      goals: patient.patientProfile.goals
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
|--------------------------------------------------------------------------
| 4. View a Doctor's Slots
|--------------------------------------------------------------------------
*/
router.get("/doctor/:doctorId/slots", auth, patientOnly, async (req, res) => {
  try {
    const doctor = await User.findById(req.params.doctorId).select(
      "username doctorProfile.slots"
    );

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    res.json({
      doctor: doctor.username,
      slots: doctor.doctorProfile.slots,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
|--------------------------------------------------------------------------
| 5. Book a Doctor Slot (only after appointing doctor)
|--------------------------------------------------------------------------
*/
router.post("/book-slot", auth, patientOnly, async (req, res) => {
  try {
    const { doctorId, slotIndex } = req.body;
    const patientId = req.userId;

    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    // Check if patient appointed doctor
    if (!doctor.doctorProfile.patients.includes(patientId)) {
      return res.status(400).json({
        msg: "You must appoint this doctor before booking slots",
      });
    }
    const slot = doctor.doctorProfile.slots[slotIndex];

    if (!slot) return res.status(404).json({ msg: "Slot not found" });
    if (slot.isBooked) return res.status(400).json({ msg: "Slot already booked" });

    // Book slot
    slot.isBooked = true;
    slot.bookedBy = patientId;
    await doctor.save();
    const patient = await User.findById(patientId);

    patient.patientProfile.bookings.push({
      doctor: doctorId,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: "upcoming"
    });

    await patient.save();
    res.json({ msg: "Slot booked successfully", slot });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/cancel-slot", auth, patientOnly, async (req, res) => {
  try {
    const { doctorId, slotIndex } = req.body;
    const patientId = req.userId;

    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    const slot = doctor.doctorProfile.slots[slotIndex];

    if (!slot) {
      return res.status(404).json({ msg: "Slot not found" });
    }

    // Check if slot is booked
    if (!slot.isBooked) {
      return res.status(400).json({ msg: "Slot is not booked" });
    }

    // Check if THIS patient booked it
    if (slot.bookedBy.toString() !== patientId.toString()) {
      return res.status(403).json({ msg: "You didn't book this slot" });
    }

    // Cancel the booking
    slot.isBooked = false;
    slot.bookedBy = null;

    await doctor.save();

    res.json({
      msg: "Slot booking cancelled successfully",
      slot
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
|--------------------------------------------------------------------------
| Export Routes
|--------------------------------------------------------------------------
*/
module.exports = router;
