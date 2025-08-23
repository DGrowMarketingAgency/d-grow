import pool from "../config/db.js";

export const getEmployees = async (req, res) => {
  try {
    // Query to fetch employee id, name, and role.
    // Adjust the query if you need to filter for specific roles.
    const result = await pool.query(
      "SELECT id, name, email, role, department, access_rights FROM users ORDER BY name ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};