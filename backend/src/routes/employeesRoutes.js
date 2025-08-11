import express from "express";
import { getEmployees } from "../controllers/employeesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

<<<<<<< HEAD
// GET /api/employees - Returns a list of employees for chatting (Super Admin only)
router.get("/", protect(['Super Admin']), getEmployees);
=======
// GET /api/employees - Returns a list of employees for chatting
router.get("/", protect(), getEmployees);
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e

export default router;