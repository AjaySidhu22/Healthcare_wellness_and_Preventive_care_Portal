module.exports = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ msg: "Only admin can access this route" });
  }
  next();
};
