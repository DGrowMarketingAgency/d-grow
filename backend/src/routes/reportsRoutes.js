import express from "express";
import { getDepartmentStatusReport } from "../controllers/reportsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/reports/status?department=XYZ generates a PDF report for the department
router.get("/status", protect(), getDepartmentStatusReport);

export default router;