const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/key");
module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "No token provided. Access denied." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(401).json({ msg: "Invalid or expired token." });
  }
};
