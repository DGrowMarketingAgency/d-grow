import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role FROM users WHERE role = 'Employee'"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Add new employee
export const addEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Basic empty check
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // ✅ Password format validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 chars, include uppercase, lowercase, number, and special character",
      });
    }

    // Check if exists
    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'Employee') RETURNING id, name, email, role",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Employee added", employee: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update employee
export const updateEmployee = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    // ✅ Validate role
    const validRoles = ["Employee", "Admin", "Client"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // ✅ Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
    }

    // ✅ If password provided, hash it
    let hashedPassword = null;
    if (password) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message:
            "Password must be 8+ chars with uppercase, lowercase, number, and special char",
        });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // ✅ Build dynamic query
    const fields = [];
    const values = [];
    let idx = 1;

    if (name) {
      fields.push(`name=$${idx++}`);
      values.push(name);
    }
    if (email) {
      fields.push(`email=$${idx++}`);
      values.push(email);
    }
    if (role) {
      fields.push(`role=$${idx++}`);
      values.push(role);
    }
    if (hashedPassword) {
      fields.push(`password=$${idx++}`);
      values.push(hashedPassword);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    values.push(req.params.id);
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id=$${idx}`;
    await pool.query(query, values);

    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    // Delete the user record with the given id
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Error deleting employee" });
  }
};
