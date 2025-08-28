import express from "express";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import pool from "../config/db.js";
import { sendPrivateMessage, getConversation, clearConversation} from "../controllers/privateMsgsController.js";
import multer from 'multer';
// Use memoryStorage to capture file buffer for DB storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
<<<<<<< HEAD
=======
=======
import { sendPrivateMessage, getConversation, clearConversation} from "../controllers/privateMsgsController.js";
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

<<<<<<< HEAD
// Allow optional file upload with key 'file'
router.post("/send", protect(), upload.single('file'), sendPrivateMessage);
=======
<<<<<<< HEAD
// Allow optional file upload with key 'file'
router.post("/send", protect(), upload.single('file'), sendPrivateMessage);
=======
// Endpoint for sending a private message
router.post("/send", protect(), sendPrivateMessage);
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

// Endpoint for fetching conversation with a specific user
router.get("/conversation/:receiver_id", protect(), getConversation);

router.delete("/conversation/:receiver_id/clear", protect(), clearConversation);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
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
<<<<<<< HEAD
=======
=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

export default router;