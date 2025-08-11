import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/api/notifications', config);
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`, {}, config);
      setNotifications((prev) => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`, config);
      setNotifications((prev) => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div className="min-h-screen brand-bg flex items-center justify-center p-6 font-poppins">
  <div className="bg-white bg-opacity-100 backdrop-blur-md ring-1 ring-gray-300 rounded-lg shadow-xl p-10 w-full max-w-2xl mx-auto">
        <div className="flex items-center text-white mb-6">
          <span className="text-4xl mr-2">🔔</span>
          <h2 className="text-3xl font-semibold">Notifications</h2>
        </div>
        {notifications.length === 0 ? (
          <p className="text-white">No notifications.</p>
        ) : (
          <div className="notifications">
            {notifications.map((n) => (
              <div key={n.id} className="notification">
                <span className="message">{n.message}</span>
                <span className="timestamp">{new Date(n.created_at).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
