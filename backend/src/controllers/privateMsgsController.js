import pool from "../config/db.js";
import { createNotification } from "./notificationsController.js";

// Send a private message
export const sendPrivateMessage = async (req, res) => {
  try {
<<<<<<< HEAD
    const sender_id = req.user.id;
    const { receiver_id, message } = req.body;
    if (!receiver_id || (!message && !req.file)) {
      return res.status(400).json({ message: "Receiver and message or file are required." });
    }
    const messageValue = message || '';
    const attachment_data = req.file ? req.file.buffer : null;
    const attachment_mimetype = req.file ? req.file.mimetype : null;
    const result = await pool.query(
      `INSERT INTO private_messages (sender_id, receiver_id, message, attachment_data, attachment_mimetype)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [sender_id, receiver_id, messageValue, attachment_data, attachment_mimetype]
    );

    // Notify receiver with actual message content
  // Notify receiver with sender name and actual message content
  const notifyContent = `${req.user.name}: ${messageValue}`;
  await createNotification(receiver_id, notifyContent);
=======
    const sender_id = req.user.id; // sender is logged in user
    const { receiver_id, message } = req.body;
    if (!receiver_id || !message) {
      return res.status(400).json({ message: "Receiver and message are required." });
    }

    const result = await pool.query(
      "INSERT INTO private_messages (sender_id, receiver_id, message) VALUES ($1, $2, $3) RETURNING *",
      [sender_id, receiver_id, message]
    );

    await createNotification(receiver_id, `${req.user.name} sent you a new message.`);
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending private message." });
  }
};

// Fetch the conversation between the current user and another user
export const getConversation = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { receiver_id } = req.params; // the other conversation participant

    const result = await pool.query(
      `SELECT * FROM private_messages 
       WHERE (sender_id = $1 AND receiver_id = $2) 
          OR (sender_id = $2 AND receiver_id = $1)
       ORDER BY created_at ASC`,
      [currentUserId, receiver_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ message: "Error fetching messages." });
  }
};

export const clearConversation = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { receiver_id } = req.params;
    // Delete messages between current user and receiver
    await pool.query(
      `DELETE FROM private_messages
       WHERE (sender_id = $1 AND receiver_id = $2)
          OR (sender_id = $2 AND receiver_id = $1)`,
      [currentUserId, receiver_id]
    );
    res.json({ message: "Conversation cleared for both users." });
  } catch (error) {
    console.error("Error clearing conversation:", error);
    res.status(500).json({ message: "Error clearing conversation." });
  }
};