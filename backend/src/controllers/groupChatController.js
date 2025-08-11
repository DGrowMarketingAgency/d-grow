import pool from "../config/db.js";

// Get group chat messages for a department
export const getGroupChatMessages = async (req, res) => {
  try {
    const { department } = req.params;
    const result = await pool.query(
      "SELECT * FROM group_chat_messages WHERE department = $1 ORDER BY created_at ASC",
      [department]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching group chat messages:", error);
    res.status(500).json({ message: "Error fetching group chat messages" });
  }
};

// Post a new group chat message
export const postGroupChatMessage = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const sender_name = req.user.name;
    const { department } = req.params;
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: "Message is required" });
    const result = await pool.query(
      "INSERT INTO group_chat_messages (department, sender_id, sender_name, message) VALUES ($1, $2, $3, $4) RETURNING *",
      [department, sender_id, sender_name, message]
    );
    const newMessage = result.rows[0];

    // Broadcast the new group message to everyone in the department room
    global.io.to(department).emit("new_group_message", newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error posting group chat message:", error);
    res.status(500).json({ message: "Error posting group chat message" });
  }
};