import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getTasks, updateTaskStatus, deleteTask, getMyTasks, updateOwnTaskStatus, getTasksByDepartment } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect(["Admin", "Super Admin"]), createTask);
<<<<<<< HEAD
// Allow Admin, SuperAdmin, and Client to view all tasks (including report and onboarding)
router.get("/", protect(["Admin", "Super Admin", "Client"]), getTasks);
=======
router.get("/", protect(["Admin", "Super Admin"]), getTasks);
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
router.put("/:id", protect(["Admin", "Super Admin"]), updateTaskStatus);
router.delete("/:id", protect(["Admin", "Super Admin"]), deleteTask);
router.get("/my", protect(["Employee"]), getMyTasks);
router.get("/department/:department", protect(), getTasksByDepartment);
router.put("/employee/:id", protect(["Employee"]), updateOwnTaskStatus);

export default router;
