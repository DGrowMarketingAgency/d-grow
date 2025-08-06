import pool from "../config/db.js";
import { createNotification } from "./notificationsController.js";
// Submit leave request (Employee)
export const submitLeaveRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { start_date, end_date, reason } = req.body;

    if (!start_date || !end_date || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await pool.query(
      "INSERT INTO leaves (user_id, start_date, end_date, reason, status) VALUES ($1, $2, $3, $4, 'Pending')",
      [userId, start_date, end_date, reason]
    );

    res.json({ message: "Leave request submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: View all leave requests
export const getAllLeaveRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.*, u.name AS employee_name
       FROM leaves l
       JOIN users u ON l.user_id = u.id
       ORDER BY l.start_date DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Employee: View personal leave requests
export const getMyLeaveRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      `SELECT * FROM leaves WHERE user_id = $1 ORDER BY start_date DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Admin: Update leave request (Approve/Reject)
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    await pool.query("UPDATE leaves SET status=$1 WHERE id=$2", [status, req.params.id]);

    const result = await pool.query("SELECT user_id FROM leaves WHERE id=$1", [req.params.id]);
    const userId = result.rows[0].user_id;
    await createNotification(userId, `Your leave request has been ${status.toLowerCase()}.`);

    res.json({ message: "Leave status updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
