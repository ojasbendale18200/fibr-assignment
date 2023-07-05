const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const check =
    req.headers?.authorization &&
    req.headers?.authorization?.startsWith("Bearer");

  if (!check) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    let token = req.headers?.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, "masai");
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { authenticate };
