import express from "express";
import { sendPrivateMessage, getConversation, clearConversation} from "../controllers/privateMsgsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Endpoint for sending a private message
router.post("/send", protect(), sendPrivateMessage);

// Endpoint for fetching conversation with a specific user
router.get("/conversation/:receiver_id", protect(), getConversation);

router.delete("/conversation/:receiver_id/clear", protect(), clearConversation);

export default router;