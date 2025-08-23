import React, { useState, useEffect } from 'react';
import './SuperAdminNotifications.css';
import axios from '../api/axios';

export default function SuperAdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/notifications', authHeaders);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/notifications/${id}/read`, {}, authHeaders);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/notifications/${id}`, authHeaders);
      fetchNotifications();
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <section className="p-6 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-lg space-y-4">
      <h2 className="text-2xl text-white font-bold">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications.</p>
      ) : (
        <div className="notifications">
          {notifications.map(n => (
            <div key={n.id} className="notification">
              <span className="message">{n.message}</span>
              <span className="text-white text-xs">{new Date(n.created_at).toLocaleString()}</span>
              {!n.is_read && (
                <button onClick={() => markAsRead(n.id)} className="ml-4 text-black hover:text-gray-800 text-sm transition-colors">Mark Read</button>
              )}
              <button onClick={() => deleteNotification(n.id)} className="ml-2 text-black hover:text-gray-800 text-sm transition-colors">Delete</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
