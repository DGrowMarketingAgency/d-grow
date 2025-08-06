import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getTasks, updateTaskStatus, deleteTask, getMyTasks, updateOwnTaskStatus, getTasksByDepartment } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect(["Admin", "Super Admin"]), createTask);
router.get("/", protect(["Admin", "Super Admin"]), getTasks);
router.put("/:id", protect(["Admin", "Super Admin"]), updateTaskStatus);
router.delete("/:id", protect(["Admin", "Super Admin"]), deleteTask);
router.get("/my", protect(["Employee"]), getMyTasks);
router.get("/department/:department", protect(), getTasksByDepartment);
router.put("/employee/:id", protect(["Employee"]), updateOwnTaskStatus);

export default router;
