import express from "express";
import pool from "../config/db.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  checkIn,
  checkOut,
  getMonthlyAttendance,
  updateAttendance,
  deleteAttendance,
  exportAttendance
} from "../controllers/attendanceController.js";

const router = express.Router();

// Employee routes
router.post("/checkin", protect(["Employee", "Admin", "Super Admin"]), checkIn);
router.post("/checkout", protect(["Employee", "Admin", "Super Admin"]), checkOut);
router.get("/monthly", protect(), getMonthlyAttendance);
router.get("/all", protect(["Admin", "Super Admin"]), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, u.name as employee_name 
       FROM attendance a 
       JOIN users u ON a.user_id = u.id 
       ORDER BY a.check_in DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Admin / Super Admin routes
router.put("/:id", protect(["Admin", "Super Admin"]), updateAttendance);
router.delete("/:id", protect(["Admin", "Super Admin"]), deleteAttendance);
router.get("/export", protect(["Admin", "Super Admin"]), exportAttendance);


export default router;
