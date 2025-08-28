import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import axios from "../api/axios";

// Using axios instance with baseURL http://localhost:5000/api
=======
<<<<<<< HEAD
import axios from "../api/axios";

// Using axios instance with baseURL http://localhost:5000/api
=======
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

const PrivateChat = ({ receiverId, receiverName, onClose }) => {
  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("id"), 10);
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState([]);
<<<<<<< HEAD
  const [file, setFile] = useState(null);
=======
<<<<<<< HEAD
  const [file, setFile] = useState(null);
=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

  const fetchConversation = async () => {
    try {
      const res = await axios.get(`/api/private-msgs/conversation/${receiverId}`, authHeaders);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      // For messages with attachments, fetch blob and create local URL
      const conv = await Promise.all(res.data.map(async (msg) => {
        if (msg.attachment_mimetype) {
          try {
            const blobRes = await axios.get(
              `/api/private-msgs/attachment/${msg.id}`,
              { responseType: 'blob', headers: { Authorization: `Bearer ${token}` } }
            );
            const blobUrl = URL.createObjectURL(blobRes.data);
            return { ...msg, attachmentUrl: blobUrl };
          } catch (err) {
            console.error('Error fetching attachment blob:', err);
          }
        }
        return msg;
      }));
      setConversation(conv);
<<<<<<< HEAD
=======
=======
      setConversation(res.data);
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
    } catch (error) {
      console.error("Error fetching conversation:", error.response?.data?.message || error.message);
    }
  };

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() && !file) return;
    try {
      const formData = new FormData();
      formData.append('receiver_id', receiverId);
      formData.append('message', messageText);
      if (file) formData.append('file', file);
      console.log('Sending message', { receiverId, messageText, file });
      // let axios set Content-Type for multipart/form-data automatically
      await axios.post(
        "/api/private-msgs/send",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessageText("");
      setFile(null);
<<<<<<< HEAD
=======
=======
  const sendMessage = async () => {
    if (!messageText.trim()) return;
    try {
      await axios.post(
        "/api/private-msgs/send",
        { receiver_id: receiverId, message: messageText },
        authHeaders
      );
      setMessageText("");
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 w-full text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Conversation with {receiverName}</h3>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm transition"
        >
<<<<<<< HEAD
=======
=======
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Conversation with {receiverName}</h3>
        <button onClick={onClose} style={{ fontSize: "0.8rem", padding: "0.3rem 0.5rem" }}>
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
          Close Chat
        </button>
      </div>
      {conversation.length === 0 && (
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
        <p className="mt-4 text-gray-300">You have started a conversation with {receiverName}.</p>
      )}
      <div className="max-h-60 overflow-y-auto mt-4 space-y-2">
        {conversation.map((msg) => {
          const isMe = Number(msg.sender_id) === Number(currentUserId);
          const bubbleClasses = isMe ? 'bg-indigo-600 ml-auto' : 'bg-gray-700 mr-auto';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`${bubbleClasses} max-w-xs px-4 py-2 rounded-lg ${isMe ? 'text-white' : 'text-gray-900 dark:text-white'}`}>   
                <div className="flex justify-between">
                  <strong>{isMe ? 'You' : receiverName}</strong>
                  <small className="text-xs text-gray-300 ml-2">
                    {new Date(msg.created_at).toLocaleString()}
                  </small>
                </div>
                {msg.message && <p className="mt-1">{msg.message}</p>}
                {msg.attachment_mimetype && (
                  <div className="mt-2">
                    {msg.attachment_mimetype.startsWith('image/') ? (
                      <img src={msg.attachmentUrl} alt="attachment" className="rounded max-w-full" />
                    ) : msg.attachment_mimetype === 'application/pdf' ? (
                      <embed src={msg.attachmentUrl} type="application/pdf" className="w-full h-40" />
                    ) : (
                      <a
                        href={msg.attachmentUrl}
                        download
                        className="text-indigo-200 underline"
                      >
                        Download Attachment
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex flex-col gap-3">
<<<<<<< HEAD
=======
=======
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
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
          className="w-full px-4 py-2 rounded bg-white bg-opacity-20 text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-300 focus:bg-opacity-30"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="file:bg-indigo-600 file:text-white file:px-2 file:py-1 file:rounded cursor-pointer text-gray-200"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-lg transition"
        >
          Send
        </button>
      </form>
      <div className="mt-4 text-right">
        <button
          onClick={clearConversationHandler}
          className="text-sm text-red-400 hover:text-red-300 transition"
        >
<<<<<<< HEAD
=======
=======
          style={{ flex: 1, boxSizing: "border-box" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <button onClick={clearConversationHandler} style={{ fontSize: "0.8rem", padding: "0.3rem 0.5rem" }}>
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
          Clear Conversation
        </button>
      </div>
    </div>
  );
};

export default PrivateChat;