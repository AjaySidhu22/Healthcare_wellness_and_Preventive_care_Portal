const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const { JWT_SECRET } = require("../config/key");
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, pfp } = req.body;

    let exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ msg: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const patient = new User({
      username,
      email,
      password: hashed,
      pfp,
      role: "patient",
      patientProfile: {
        goals: {},
        upcomingCheckups: [],
        bookings:[]
      }
    });

    await patient.save();

    res.json({ msg: "Patient registered successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login", async (req, res) => {
  console.log("Login attempt");
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
