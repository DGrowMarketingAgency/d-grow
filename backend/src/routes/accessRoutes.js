import express from "express";
import { updateAccessRights } from "../controllers/accessController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only Super Admin can update access rights
router.put("/:employeeId", protect(["Super Admin"]), updateAccessRights);

export default router;