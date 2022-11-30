const authMiddleware = (req, res, next) => {
  const { email } = req.user;
  const adminEmail = "admin@admin";
  email === adminEmail
    ? next()
    : res.status(403).json({ error: "Unauthorized" });
};

module.exports = authMiddleware;
