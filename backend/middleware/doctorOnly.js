module.exports = (req, res, next) => {
  if (req.userRole !== "doctor") {
    return res.status(403).json({ msg: "Only doctors can access this route" });
  }
  next();
};
