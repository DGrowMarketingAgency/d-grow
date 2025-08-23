import pool from '../config/db.js';
import { createNotification } from './notificationsController.js';

// Create a new project (Super Admin only)
export const createProject = async (req, res) => {
  try {
  const { name, description } = req.body;
  const created_by = req.user.id;
  if (!name || !description) {
    return res.status(400).json({ message: 'Project name and description required' });
  }
  // Determine assignee: clients auto-assign to a Super Admin
  let assigneeId;
  if (req.user.role === 'Client') {
    const adminRes = await pool.query(
      "SELECT id FROM users WHERE role = 'Super Admin' LIMIT 1"
    );
    if (adminRes.rows.length === 0) {
      return res.status(500).json({ message: 'No Super Admin available to assign project' });
    }
    assigneeId = adminRes.rows[0].id;
  } else {
    // Super Admin creating directly
    assigneeId = req.body.assigned_to;
    if (!assigneeId) {
      return res.status(400).json({ message: 'Assigned employee required' });
    }
  }
  const result = await pool.query(
    `INSERT INTO projects (project_name, description, assigned_to, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING id, project_name AS name, description, assigned_to, created_by, created_at`,
    [name, description, assigneeId, created_by]
  );
  const project = result.rows[0];
    // Notify assigned employee
    await createNotification(project.assigned_to, `You have been assigned to project '${project.name}'.`);
    res.status(201).json(project);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all projects (Super Admin and Admin)
export const getProjects = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id,
              p.project_name AS name,
              p.status,
              p.assigned_to,
              p.created_by,
              p.created_at,
              u.name AS employee_name,
              creator.name AS created_by_name
       FROM projects p
       JOIN users u ON p.assigned_to = u.id
       JOIN users creator ON p.created_by = creator.id
       ORDER BY p.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get projects assigned to current user
export const getMyProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    let query;
    let params = [userId];
    // Clients see projects they created; Employees see assigned projects
    if (req.user.role === 'Client') {
      query = `SELECT p.id,
                      p.project_name AS name,
                      p.description,
                      p.status,
                      p.assigned_to,
                      p.created_by,
                      p.created_at,
                      u.name AS assigned_to_name
               FROM projects p
               JOIN users u ON p.assigned_to = u.id
               WHERE p.created_by = $1
               ORDER BY p.created_at DESC`;
    } else {
      query = `SELECT p.id,
                      p.project_name AS name,
                      p.description,
                      p.status,
                      p.assigned_to,
                      p.created_by,
                      p.created_at,
                      creator.name AS created_by_name
               FROM projects p
               JOIN users creator ON p.created_by = creator.id
               WHERE p.assigned_to = $1
               ORDER BY p.created_at DESC`;
    }
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching my projects:', err);
    res.status(500).json({ message: err.message });
  }
};

// Employee marks project status (e.g., Completed)
export const updateProjectStatus = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const { status } = req.body;
    // Update project status
    const updateRes = await pool.query(
      'UPDATE projects SET status = $1 WHERE id = $2 RETURNING *',
      [status, projectId]
    );
    const project = updateRes.rows[0];
    // If completed, create a task for Admins
    if (status === 'Completed') {
      // Fetch Admin users
      const admins = await pool.query(
        "SELECT id FROM users WHERE role = 'Admin' OR role = 'SuperAdmin'"
      );
      const tasksToCreate = admins.rows;
      for (const admin of tasksToCreate) {
        await pool.query(
          `INSERT INTO tasks (title, description, assigned_to, department)
           VALUES ($1, $2, $3, $4)`,
          [`Project '${project.project_name}' completed: send report to client`,
           'Please generate and send the project report to the client.',
           admin.id,
           null
          ]
        );
      }
    }
    res.json({ message: 'Project status updated', project });
  } catch (err) {
    console.error('Error updating project status:', err);
    res.status(500).json({ message: err.message });
  }
};
// Delete a project (Client can delete own, Super Admin can delete any)
export const deleteProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    // Fetch project
    const projRes = await pool.query('SELECT * FROM projects WHERE id = $1', [projectId]);
    if (projRes.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const project = projRes.rows[0];
    // Check permissions
    if (req.user.role === 'Client' && project.created_by !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed to delete this project' });
    }
    // Perform deletion
    await pool.query('DELETE FROM projects WHERE id = $1', [projectId]);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: err.message });
  }
};

// Super Admin: assign project to employee and update description
export const updateProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const { assigned_to, description } = req.body;
    if (!assigned_to || !description) {
      return res.status(400).json({ message: 'Assigned employee and description required' });
    }
    // Verify project exists
    const projRes = await pool.query('SELECT project_name FROM projects WHERE id = $1', [projectId]);
    if (projRes.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const projectName = projRes.rows[0].project_name;
    // Update project
    const updateRes = await pool.query(
      `UPDATE projects SET assigned_to = $1, description = $2 WHERE id = $3 RETURNING id, project_name AS name, description, assigned_to, created_by, created_at`,
      [assigned_to, description, projectId]
    );
    const updatedProject = updateRes.rows[0];
    // Notify assigned employee
    await createNotification(assigned_to, `You have been assigned to project '${updatedProject.name}'.`);
    res.json(updatedProject);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ message: err.message });
  }
};
