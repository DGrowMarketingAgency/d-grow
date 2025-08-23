import express from "express";
import { getEmployees } from "../controllers/employeesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/employees - Returns a list of employees for chatting (Super Admin only)
router.get("/", protect(['Super Admin']), getEmployees);

export default router;