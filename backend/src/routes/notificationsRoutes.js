import express from "express";
import { getNotifications, markNotificationAsRead, deleteNotification } from "../controllers/notificationsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// This route returns notifications for the current user
router.get("/", protect(), getNotifications);
router.patch("/:id/read", protect(), markNotificationAsRead);
router.delete("/:id", protect(), deleteNotification);

export default router;