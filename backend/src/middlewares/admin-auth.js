const adminAuth = (req, res, next) => {
  if (req.loggedInUser?.role !== "admin") {
    return res.status(403).json({ error: "You are unauthorized" });
  }
  next();
};

module.exports = adminAuth;
