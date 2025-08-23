import express from "express";
import { getGroupChatMessages, postGroupChatMessage } from "../controllers/groupChatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/group-chat/:department - fetch all messages for a department
router.get("/:department", protect(), getGroupChatMessages);

// POST /api/group-chat/:department - post a new message to a department
router.post("/:department", protect(), postGroupChatMessage);

export default router;