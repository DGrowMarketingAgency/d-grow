import express from "express";
import { register, login, logout } from "../controllers/authController.js";
<<<<<<< HEAD
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Registration restricted to Admins and SuperAdmins only
// Only Admins can register new users
router.post("/register", protect(['Admin']), register);
=======

const router = express.Router();

router.post("/register", register);
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
router.post("/login", login);
router.post("/logout", logout);

export default router;
