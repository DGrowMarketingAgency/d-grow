import React, { useState, useEffect } from "react";
import axios from "../api/axios";

// Using axios instance with baseURL http://localhost:5000/api

const PrivateChat = ({ receiverId, receiverName, onClose }) => {
  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("id"), 10);
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [file, setFile] = useState(null);

  const fetchConversation = async () => {
    try {
      const res = await axios.get(`/api/private-msgs/conversation/${receiverId}`, authHeaders);
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
    } catch (error) {
      console.error("Error fetching conversation:", error.response?.data?.message || error.message);
    }
  };

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
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 w-full text-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Conversation with {receiverName}</h3>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm transition"
        >
          Close Chat
        </button>
      </div>
      {conversation.length === 0 && (
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
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
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
          Clear Conversation
        </button>
      </div>
    </div>
  );
};

export default PrivateChat;