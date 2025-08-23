import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/adminController.js";

const router = express.Router();

// Admin & Super Admin only
router.get("/employees", protect(["Admin", "Super Admin"]), getAllEmployees);
router.post("/employees", protect(["Admin", "Super Admin"]), addEmployee);
router.put("/employees/:id", protect(["Admin", "Super Admin"]), updateEmployee);
router.delete("/employees/:id", protect(["Admin", "Super Admin"]), deleteEmployee);

export default router;
