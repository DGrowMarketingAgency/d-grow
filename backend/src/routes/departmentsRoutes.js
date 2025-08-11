import express from "express";
import { getDepartments, updateUserDepartment, addDepartment } from "../controllers/departmentsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all available departments
router.get("/", protect(), getDepartments);

// Create a new department
router.post("/", protect(), addDepartment);

// Update the department for a user (pass user id in params)
router.put("/:id", protect(), updateUserDepartment);

export default router;