import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Registration restricted to Admins and SuperAdmins only
// Only Admins can register new users
router.post("/register", protect(['Admin']), register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
