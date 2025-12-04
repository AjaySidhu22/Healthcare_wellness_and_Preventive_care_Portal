module.exports = (req, res, next) => {
  if (req.userRole !== "patient") {
    return res.status(403).json({ msg: "Only patients can access this route" });
  }
  next();
};
