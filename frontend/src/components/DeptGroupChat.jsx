import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

axios.defaults.baseURL = "http://localhost:5000";

const DeptGroupChat = ({ department }) => {
  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("id"), 10);
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/group-chat/${department}`, authHeaders);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching group messages:", error.response?.data?.message || error.message);
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim()) return;
    try {
      await axios.post(`/api/group-chat/${department}`, { message: messageText }, authHeaders);
      setMessageText("");
      // Socket event will update messages automatically.
    } catch (error) {
      console.error("Error sending group chat message:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
    const newSocket = io("http://localhost:5000");
    // Join the department room
    newSocket.emit("join_department", department);
    newSocket.on("new_group_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [department]);

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "100%", boxSizing: "border-box" }}>
      <h3>Department Group Chat: {department}</h3>
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #eee",
          padding: "0.5rem",
          marginBottom: "0.5rem"
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              margin: "0.5rem 0",
              color: msg.sender_id === 0 ? "grey" : "inherit",
              fontStyle: msg.sender_id === 0 ? "italic" : "normal"
            }}
          >
            {msg.sender_id === 0 ? (
              <span>{msg.message}</span>
            ) : (
              <>
                <strong>{Number(msg.sender_id) === currentUserId ? "You" : msg.sender_name}:</strong> {msg.message}
              </>
            )}
            <small style={{ display: "block", fontSize: "0.7rem", color: "#888" }}>
              {new Date(msg.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          style={{ flex: 1, boxSizing: "border-box" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default DeptGroupChat;