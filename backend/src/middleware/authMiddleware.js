import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const protect = (roles = []) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    // Check blacklist first
    const blacklisted = await pool.query(
      "SELECT * FROM token_blacklist WHERE token = $1",
      [token]
    );
    if (blacklisted.rows.length > 0) {
      return res.status(401).json({ message: "Token expired or logged out" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
