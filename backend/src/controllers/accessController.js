import pool from "../config/db.js";

export const updateAccessRights = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { access } = req.body; // Expected access is an object like { private_chat: true, leave_request: false, group_chat: true }
    if (typeof access !== "object") {
      return res.status(400).json({ message: "Invalid access rights payload" });
    }
    const result = await pool.query(
      "UPDATE users SET access_rights = $1 WHERE id = $2 RETURNING id, name, access_rights",
      [access, employeeId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Access rights updated", user: result.rows[0] });
  } catch (error) {
    console.error("Error updating access rights:", error);
    res.status(500).json({ message: "Error updating access rights" });
  }
};