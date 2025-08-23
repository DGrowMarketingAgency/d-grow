import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createProject, getProjects, getMyProjects, updateProjectStatus, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

// Client and SuperAdmin: create project (clients auto-assign to Super Admin)
router.post('/', protect(['Client', 'Super Admin']), createProject);
// Admin & SuperAdmin: view all projects
router.get('/', protect(['Admin', 'SuperAdmin', 'Super Admin']), getProjects);
// Employee & Client: view own projects
router.get('/my', protect(['Employee','Client']), getMyProjects);
// Employee: mark project completed
// Employee, Admin & Super Admin: mark project completed
router.put('/:id/status', protect(['Employee', 'Admin', 'Super Admin']), updateProjectStatus);
// SuperAdmin: assign existing project to employee and set description
router.put('/:id', protect(['Super Admin']), updateProject);
// Delete a project
router.delete('/:id', protect(['Client','Super Admin']), deleteProject);

export default router;
