const express = require("express");
const router = express.Router();

const User = require("../models/user");

const auth = require("../middleware/auth");
const doctorOnly = require("../middleware/doctorOnly");

/*
|--------------------------------------------------------------------------
| 1. Create Appointment Slot (Date + Time Range)
|--------------------------------------------------------------------------
*/
router.post("/create-slot", auth, doctorOnly, async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    const doctor = await User.findById(req.userId);

    doctor.doctorProfile.slots.push({
      date,
      startTime,
      endTime,
      isBooked: false,
      bookedBy: null,
    });

    await doctor.save();

    res.json({
      msg: "Slot created successfully",
      slots: doctor.doctorProfile.slots,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
|--------------------------------------------------------------------------
| 2. View All Slots of Doctor
|--------------------------------------------------------------------------
*/
router.get("/my-slots", auth, doctorOnly, async (req, res) => {
  try {
    const doctor = await User.findById(req.userId).select(
      "username doctorProfile.slots"
    );

    res.json({
      doctor: doctor.username,
      slots: doctor.doctorProfile.slots,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
|--------------------------------------------------------------------------
| 3. View All Patients Assigned to Doctor
|--------------------------------------------------------------------------
*/
router.get("/my-patients", auth, doctorOnly, async (req, res) => {
  try {
    const doctor = await User.findById(req.userId)
      .populate("doctorProfile.patients", "username email pfp")
      .select("doctorProfile.patients");

    res.json({
      patients: doctor.doctorProfile.patients,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
|--------------------------------------------------------------------------
| 4. Delete a Slot
|--------------------------------------------------------------------------
*/
router.delete("/delete-slot/:slotIndex", auth, doctorOnly, async (req, res) => {
  try {
    const { slotIndex } = req.params;

    const doctor = await User.findById(req.userId);

    if (!doctor.doctorProfile.slots[slotIndex]) {
      return res.status(404).json({ msg: "Slot not found" });
    }

    doctor.doctorProfile.slots.splice(slotIndex, 1);
    await doctor.save();

    res.json({ msg: "Slot deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
|--------------------------------------------------------------------------
| 5. View All Booked Appointments
|--------------------------------------------------------------------------
*/
router.get("/booked-appointments", auth, doctorOnly, async (req, res) => {
  try {
    const doctor = await User.findById(req.userId)
      .populate("doctorProfile.slots.bookedBy", "username email pfp")
      .select("doctorProfile.slots");

    const bookedSlots = doctor.doctorProfile.slots.filter(
      (slot) => slot.isBooked === true
    );

    res.json({ bookedAppointments: bookedSlots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
|--------------------------------------------------------------------------
| Export Doctor Routes
|--------------------------------------------------------------------------
*/
module.exports = router;
