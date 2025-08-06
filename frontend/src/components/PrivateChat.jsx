import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

const PrivateChat = ({ receiverId, receiverName, onClose }) => {
  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("id"), 10);
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState([]);

  const fetchConversation = async () => {
    try {
      const res = await axios.get(`/api/private-msgs/conversation/${receiverId}`, authHeaders);
      setConversation(res.data);
    } catch (error) {
      console.error("Error fetching conversation:", error.response?.data?.message || error.message);
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim()) return;
    try {
      await axios.post(
        "/api/private-msgs/send",
        { receiver_id: receiverId, message: messageText },
        authHeaders
      );
      setMessageText("");
      fetchConversation();
    } catch (error) {
      console.error("Error sending message:", error.response?.data?.message || error.message);
    }
  };

  const clearConversationHandler = async () => {
    try {
      await axios.delete(`/api/private-msgs/conversation/${receiverId}/clear`, authHeaders);
      setConversation([]); 
    } catch (error) {
      console.error("Error clearing conversation:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchConversation();
    const interval = setInterval(fetchConversation, 5000);
    return () => clearInterval(interval);
  }, [receiverId]);

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Conversation with {receiverName}</h3>
        <button onClick={onClose} style={{ fontSize: "0.8rem", padding: "0.3rem 0.5rem" }}>
          Close Chat
        </button>
      </div>
      {conversation.length === 0 && (
        <p>You have started a conversation with {receiverName}.</p>
      )}
      <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #eee", padding: "0.5rem", boxSizing: "border-box" }}>
        {conversation.map((msg) => (
          <div key={msg.id} style={{ margin: "0.5rem 0" }}>
            <strong>{Number(msg.sender_id) === Number(currentUserId) ? "You" : receiverName}:</strong> {msg.message}
            <small style={{ display: "block", fontSize: "0.7rem", color: "#888" }}>
              {new Date(msg.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          style={{ flex: 1, boxSizing: "border-box" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={clearConversationHandler} style={{ fontSize: "0.8rem", padding: "0.3rem 0.5rem" }}>
          Clear Conversation
        </button>
      </div>
    </div>
  );
};

export default PrivateChat;