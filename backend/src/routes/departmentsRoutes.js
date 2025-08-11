import express from "express";
<<<<<<< HEAD
import { getDepartments, updateUserDepartment, addDepartment } from "../controllers/departmentsController.js";
=======
import { getDepartments, updateUserDepartment } from "../controllers/departmentsController.js";
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all available departments
router.get("/", protect(), getDepartments);

<<<<<<< HEAD
// Create a new department
router.post("/", protect(), addDepartment);

=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
// Update the department for a user (pass user id in params)
router.put("/:id", protect(), updateUserDepartment);

export default router;