import express from "express";
import { getEmployees } from "../controllers/employeesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/employees - Returns a list of employees for chatting
router.get("/", protect(), getEmployees);

export default router;