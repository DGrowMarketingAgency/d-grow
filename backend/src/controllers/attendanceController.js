import pool from "../config/db.js";
import { Parser } from 'json2csv';
// Employee Check-In
export const checkIn = async (req, res) => {
  try {
    const userId = req.user.id;

    // Prevent double check-in
    const today = await pool.query(
      "SELECT * FROM attendance WHERE user_id=$1 AND DATE(check_in)=CURRENT_DATE",
      [userId]
    );
    if (today.rows.length > 0) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    await pool.query(
      "INSERT INTO attendance (user_id, check_in, status) VALUES ($1, NOW(), 'Present')",
      [userId]
    );
    res.json({ message: "Checked in successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Employee Check-Out
export const checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT * FROM attendance WHERE user_id=$1 AND DATE(check_in)=CURRENT_DATE",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "You must check in first" });
    }

    const attendanceId = result.rows[0].id;

    await pool.query(
      "UPDATE attendance SET check_out = NOW() WHERE id = $1",
      [attendanceId]
    );
    res.json({ message: "Checked out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Monthly Attendance Overview
export const getMonthlyAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    const result = await pool.query(
      `SELECT * FROM attendance 
       WHERE user_id=$1 AND EXTRACT(MONTH FROM check_in)=$2 AND EXTRACT(YEAR FROM check_in)=$3
       ORDER BY check_in ASC`,
      [userId, month, year]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin/Super Admin: Update Attendance
export const updateAttendance = async (req, res) => {
  try {
    const { check_in, check_out, status } = req.body;
    await pool.query(
      "UPDATE attendance SET check_in=$1, check_out=$2, status=$3 WHERE id=$4",
      [check_in, check_out, status, req.params.id]
    );
    res.json({ message: "Attendance updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin/Super Admin: Delete Attendance
export const deleteAttendance = async (req, res) => {
  try {
    await pool.query("DELETE FROM attendance WHERE id=$1", [req.params.id]);
    res.json({ message: "Attendance deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const exportAttendance = async (req, res) => {
  try {
    // Query attendance records with employee name details
    const result = await pool.query(
      `SELECT a.id, a.user_id, a.check_in, a.check_out, a.status, u.name as employee_name 
       FROM attendance a 
       JOIN users u ON a.user_id = u.id 
       ORDER BY a.check_in DESC`
    );
    const attendanceData = result.rows;

    // Specify the CSV fields
    const fields = ['id', 'user_id', 'employee_name', 'check_in', 'check_out', 'status'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(attendanceData);

    res.header('Content-Type', 'text/csv');
    res.attachment('attendance.csv');
    return res.send(csv);
  } catch (error) {
    console.error("Error exporting attendance:", error);
    return res.status(500).json({ message: "Error exporting attendance" });
  }
};