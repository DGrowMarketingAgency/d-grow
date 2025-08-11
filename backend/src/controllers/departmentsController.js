import pool from "../config/db.js";

// Return all available departments
export const getDepartments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM departments ORDER BY name ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Error fetching departments" });
  }
};

export const updateUserDepartment = async (req, res) => {
  try {
    const userId = req.params.id;
    const { department } = req.body;
    // Only throw error if department is undefined (i.e. not sent)
    if (department === undefined) {
      return res.status(400).json({ message: "Department is required" });
    }

    // Get previous department and user name
    const prevRes = await pool.query("SELECT department, name FROM users WHERE id = $1", [userId]);
    if (prevRes.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const prevDept = prevRes.rows[0].department;
    const userName = prevRes.rows[0].name;

    // Update user's department (works both for joining and leaving)
    await pool.query("UPDATE users SET department = $1 WHERE id = $2", [department, userId]);

    // If leaving department (department is null) and there was a previous dept,
    // broadcast a system message indicating the user left.
    if (department === null && prevDept) {
      const systemMsg = {
        id: Date.now(),
        department: prevDept,
        sender_id: 0, // system message
        sender_name: "System",
        message: `${userName} left the department group`,
        created_at: new Date()
      };
      global.io.to(prevDept).emit("new_group_message", systemMsg);
    }
    // If joining department (department is not null) and there was no previous dept,
    // broadcast a system message indicating the user joined.
    if (department !== null && !prevDept) {
      const systemMsg = {
        id: Date.now(),
        department: department,
        sender_id: 0, // system message
        sender_name: "System",
        message: `${userName} joined the department group`,
        created_at: new Date()
      };
      global.io.to(department).emit("new_group_message", systemMsg);
    }

    res.json({ message: "Department updated successfully", department });
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ message: "Error updating department" });
  }
<<<<<<< HEAD
};

// Add a new department
export const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Department name is required' });
    }
    const result = await pool.query(
      'INSERT INTO departments (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ message: 'Error adding department' });
  }
=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
};