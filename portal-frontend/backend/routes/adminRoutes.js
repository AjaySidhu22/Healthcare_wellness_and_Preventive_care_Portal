const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const adminOnly = require("../middleware/adminOnly");
const router = express.Router();
  
router.post("/create-doctor", adminOnly, async (req, res) => {
  try {
    const { username, email, password, pfp } = req.body;

    let exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const doctor = new User({
      username,
      email,
      password: hashed,
      pfp,
      role: "doctor",
      doctorProfile: { patients: [] }
    });

    await doctor.save();
    res.json({ msg: "Doctor created successfully", doctor });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
