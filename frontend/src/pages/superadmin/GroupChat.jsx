import React, { useState, useEffect, useRef } from 'react';
import axios from '../../api/axios';
<<<<<<< HEAD
import './GroupChat.css';
=======
import './TasksEnhancedV2.css';
import './TasksInputRed.css';
import './TasksTableWhite.css';
import './TasksCustomSelect.css';
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

export default function GroupChat() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const socketRef = useRef(null);

  // Fetch department list
  useEffect(() => {
    const fetchDepts = async () => {
      try {
        // Removed duplicated /api prefix: baseURL includes /api
        const res = await axios.get('/departments', config);
        setDepartments(res.data.map(d => d.name));
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };
    fetchDepts();
  }, []);

  // Setup chat when department selected
  useEffect(() => {
    if (!selectedDept) return;
    // Fetch existing messages for selected department
    const fetchMessages = async () => {
      try {
        // use baseURL /api, so drop '/api'
        const res = await axios.get(`/group-chat/${selectedDept}`, config);
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching group messages:', err);
      }
    };
    fetchMessages();
    // Setup socket
    socketRef.current = io(axios.defaults.baseURL, { transports: ['websocket'] });
    socketRef.current.emit('join_department', selectedDept);
    socketRef.current.on('new_group_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [selectedDept]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    try {
      // send message to group chat endpoint
      await axios.post(`/group-chat/${selectedDept}`, { message: messageText }, config);
      setMessageText('');
      // server emits via socket so no need to append manually
    } catch (err) {
      console.error('Error sending group message:', err);
    }
  };

  return (
<<<<<<< HEAD
    <div className="groupchat-page min-h-screen bg-gradient-to-r from-purple-800 to-indigo-800 flex flex-col items-center justify-center p-6 font-poppins relative overflow-hidden">
      {/* Flash overlay */}
      <div className="flash-overlay"></div>
      {/* Decorative waves */}
      <div className="wave wave-top"></div>
      <div className="wave wave-bottom"></div>
      {/* Page Heading */}
      <h1 className="text-4xl text-white font-bold mb-8 drop-shadow-lg">SuperAdmin Group Chat</h1>
       {/* Department selector */}
      {!selectedDept && (
        <div className="bg-white bg-opacity-10 backdrop-blur-md ring-1 ring-white ring-opacity-20 rounded-xl shadow-xl p-8 mb-8 w-full max-w-sm text-center">
          <p className="text-white mb-4">Select a department to join its group chat:</p>
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black focus:bg-opacity-30 transition"
=======
    <div className="tasks-enhanced-bg min-h-screen flex flex-col items-center justify-center p-6 font-poppins relative overflow-hidden">
      <h1 className="text-4xl tasks-management-heading font-bold mb-8">SuperAdmin Group Chat</h1>
      {/* Department selector */}
      {!selectedDept && (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 w-full max-w-sm text-center">
          <p className="mb-4 text-black">Select a department to join its group chat:</p>
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="w-full tasks-custom-select"
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
          >
            <option value="">Select Department</option>
            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
          </select>
        </div>
      )}
<<<<<<< HEAD
       {selectedDept && (
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-6 w-full max-w-lg text-white relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Group Chat: {selectedDept}</h2>
          <Link to="/superadmin-dashboard" className="text-indigo-200 hover:text-white transition">← Dashboard</Link>
        </div>
         <div className="max-h-80 overflow-y-auto p-3 border border-gray-300 border-opacity-50 mb-4 space-y-2">
          {messages.length === 0 && (
            <p className="text-gray-300 text-center">No messages yet. Say hello!</p>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className="px-3 py-2 bg-white bg-opacity-20 rounded-lg">
              <strong className="text-indigo-200">{msg.sender_name}:</strong>
              <span className="ml-2">{msg.message}</span>
              <div className="text-xs text-gray-400 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</div>
            </div>
          ))}
         </div>
         <form onSubmit={sendMessage} className="flex space-x-2">
          <input
             type="text"
             value={messageText}
             onChange={e => setMessageText(e.target.value)}
             placeholder="Type your message..."
             className="flex-1 px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:bg-opacity-30 transition"
           />
           <button
             type="submit"
             className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:scale-105 transform transition"
           >Send</button>
         </form>
       </div>
      )}
     </div>
   );
 }
=======
      {selectedDept && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl text-black relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold tasks-management-heading">Group Chat: {selectedDept}</h2>
            <Link to="/superadmin-dashboard" className="inline-block" style={{ background: '#a32227', color: '#fff', borderRadius: '9999px', padding: '0.4rem 1.2rem', fontWeight: 500 }}>← Dashboard</Link>
          </div>
          <div className="max-h-80 overflow-y-auto p-3 border border-gray-200 mb-4 space-y-2 bg-white rounded">
            {messages.length === 0 && (
              <p className="text-gray-400 text-center">No messages yet. Say hello!</p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="px-3 py-2 bg-[#a32227] bg-opacity-10 rounded-lg">
                <strong className="text-[#a32227]">{msg.sender_name}:</strong>
                <span className="ml-2 text-black">{msg.message}</span>
                <div className="text-xs text-gray-500 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex space-x-2">
            <input
              type="text"
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 tasks-custom-select"
            />
            <button
              type="submit"
              className="tasks-enhanced-btn"
              style={{ fontWeight: 600 }}
            >Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
