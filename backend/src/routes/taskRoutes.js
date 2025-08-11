import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getTasks, updateTaskStatus, deleteTask, getMyTasks, updateOwnTaskStatus, getTasksByDepartment } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect(["Admin", "Super Admin"]), createTask);
// Allow Admin, SuperAdmin, and Client to view all tasks (including report and onboarding)
router.get("/", protect(["Admin", "Super Admin", "Client"]), getTasks);
router.put("/:id", protect(["Admin", "Super Admin"]), updateTaskStatus);
router.delete("/:id", protect(["Admin", "Super Admin"]), deleteTask);
router.get("/my", protect(["Employee"]), getMyTasks);
router.get("/department/:department", protect(), getTasksByDepartment);
router.put("/employee/:id", protect(["Employee"]), updateOwnTaskStatus);

export default router;
