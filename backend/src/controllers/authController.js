import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
      // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Password validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      message:
        "Password must be 8+ chars, include 1 uppercase, 1 number, and 1 special character."
    });
  }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, role || 'Employee']
    );

    res.status(201).json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = userResult.rows[0];

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role, name: user.name, id: user.id, department: user.department, access_rights: user.access_rights });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "No token to logout" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save token to blacklist with expiry
    const expiryDate = new Date(decoded.exp * 1000); // JWT exp in seconds
    await pool.query(
      "INSERT INTO token_blacklist (token, expires_at) VALUES ($1, $2)",
      [token, expiryDate]
    );

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};