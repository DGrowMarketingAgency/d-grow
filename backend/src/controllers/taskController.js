import pool from "../config/db.js";
import { createNotification } from "./notificationsController.js";

export const createTask = async (req, res) => {
  try {
    // Now require department and optionally urgent flag
    const { title, description, assigned_to, department, is_urgent = false } = req.body;
    if (!title || !assigned_to || !department) {
      return res.status(400).json({ message: "Title, Department and Assigned Employee required" });
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, description, assigned_to, department, is_urgent) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, assigned_to, department, is_urgent]
    );
    await createNotification(assigned_to, `A new task "${title}" has been assigned to you.`);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Tasks
export const getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, u.name as employee_name 
       FROM tasks t 
       JOIN users u ON t.assigned_to = u.id 
       ORDER BY t.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Task Status
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query("UPDATE tasks SET status=$1 WHERE id=$2", [status, req.params.id]);
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    await pool.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasksByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    const result = await pool.query(
      `SELECT t.*, u.name as employee_name 
       FROM tasks t 
       JOIN users u ON t.assigned_to = u.id 
       WHERE t.department = $1
       ORDER BY t.created_at DESC`,
      [department]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Controller for employee to fetch own tasks
export const getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM tasks WHERE assigned_to = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employee tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOwnTaskStatus = async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND assigned_to = $2",
      [taskId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ message: "You are not authorized to update this task." });
    }

    await pool.query(
      "UPDATE tasks SET status = $1 WHERE id = $2",
      [status, taskId]
    );

    res.status(200).json({ message: "Task status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task status" });
  }
};

