import pool from "../config/db.js";

// Helper function to create a notification (can be called from other controllers)
export const createNotification = async (userId, message) => {
  try {
    const result = await pool.query(
      "INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *",
      [userId, message]
    );
    const notification = result.rows[0];

    // Emit a notification event to the receiver if online
    if (global.onlineUsers.has(userId)) {
      const socketId = global.onlineUsers.get(userId);
      global.io.to(socketId).emit("new_notification", notification);
    }
  } catch (error) {
    console.error("Error creating notification:", error);
    // Log or handle error as needed
  }
};

// Endpoint: Get notifications for current logged-in user
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    res.status(500).json({ message: "Error retrieving notifications" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      "UPDATE notifications SET is_read = true WHERE id = $1",
      [id]
    );
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Error marking notification as read" });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      "DELETE FROM notifications WHERE id = $1",
      [id]
    );
    res.json({ message: "Notification deleted" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Error deleting notification" });
  }
};