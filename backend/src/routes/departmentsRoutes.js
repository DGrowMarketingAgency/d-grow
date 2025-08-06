import express from "express";
import { getDepartments, updateUserDepartment } from "../controllers/departmentsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all available departments
router.get("/", protect(), getDepartments);

// Update the department for a user (pass user id in params)
router.put("/:id", protect(), updateUserDepartment);

export default router;