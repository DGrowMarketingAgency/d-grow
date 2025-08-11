import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import pool from "../config/db.js";
import { getMyLeaveRequests } from "../controllers/leaveController.js";

const router = express.Router();

// Employee: Request Leave
router.post("/request", protect(["Employee", "Admin", "Super Admin"]), async (req, res) => {
  const { start_date, end_date, reason } = req.body;
  const userId = req.user.id;

  if (!start_date || !end_date || !reason) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    await pool.query(
      `INSERT INTO leave_requests (user_id, start_date, end_date, reason, status)
       VALUES ($1, $2, $3, $4, 'Pending')`,
      [userId, start_date, end_date, reason]
    );
    res.json({ message: "Leave requested successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: View All Leave Requests
router.get("/all", protect(["Admin", "Super Admin"]), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT lr.*, u.name as employee_name
       FROM leave_requests lr
       JOIN users u ON lr.user_id = u.id
       ORDER BY lr.start_date ASC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Fetch logged-in user's leaves
router.get("/my", protect(["Employee", "Admin", "Super Admin"]), async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT * FROM leave_requests WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Admin: Approve/Reject Leave
router.put("/:id", protect(["Admin", "Super Admin"]), async (req, res) => {
  const { status } = req.body;
  try {
    await pool.query("UPDATE leave_requests SET status=$1 WHERE id=$2", [status, req.params.id]);
    res.json({ message: `Leave ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
