const jwt = require("jsonwebtoken");

// middleware fore veryfy jwt token

module.exports = function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
//   console.log("token", token);
  if (!token) {
    return res.status(403).json({ erro: "No token provided" });
  }
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.username = decoded.username;
    next();
  });
};
