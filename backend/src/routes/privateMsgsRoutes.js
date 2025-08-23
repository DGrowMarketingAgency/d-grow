import express from "express";
import pool from "../config/db.js";
import { sendPrivateMessage, getConversation, clearConversation} from "../controllers/privateMsgsController.js";
import multer from 'multer';
// Use memoryStorage to capture file buffer for DB storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Allow optional file upload with key 'file'
router.post("/send", protect(), upload.single('file'), sendPrivateMessage);

// Endpoint for fetching conversation with a specific user
router.get("/conversation/:receiver_id", protect(), getConversation);

router.delete("/conversation/:receiver_id/clear", protect(), clearConversation);
// Public endpoint to fetch an attachment for a specific message
router.get("/attachment/:message_id", async (req, res) => {
  try {
    const { message_id } = req.params;
    const result = await pool.query(
      `SELECT attachment_data, attachment_mimetype FROM private_messages WHERE id = $1`,
      [message_id]
    );
    if (!result.rows.length) return res.status(404).end();
    const { attachment_data, attachment_mimetype } = result.rows[0];
    if (!attachment_data) return res.status(204).end();
    res.setHeader('Content-Type', attachment_mimetype);
    res.send(attachment_data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching attachment' });
  }
});

export default router;