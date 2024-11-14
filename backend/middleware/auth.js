const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // There was a space with a non-breaking space character

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "process.env.JWT_SECRET");
    req.userId = decoded.id; // Add user ID to the request object
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
