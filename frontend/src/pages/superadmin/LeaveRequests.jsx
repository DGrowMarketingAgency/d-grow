import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import './TasksEnhancedV2.css';
import './TasksInputRed.css';
import './TasksTableWhite.css';
import './TasksCustomSelect.css';
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

export default function LeaveRequests() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/leaves/all', config);
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/leaves/${id}`, { status }, config);
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/leaves/${id}`, config);
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-indigo-800 flex justify-center p-6 font-poppins">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-white mb-4">Leave Requests</h2>
        <ul className="space-y-4">
          {requests.map(r => (
            <li key={r.id} className="bg-white bg-opacity-20 text-white p-4 rounded flex justify-between items-center">
              <div>
                <strong>{r.employee_name}</strong><br />
                {new Date(r.start_date).toLocaleDateString()} - {new Date(r.end_date).toLocaleDateString()}<br />
                <em>{r.reason}</em><br />
                <span className="mt-1 inline-block bg-white bg-opacity-30 px-2 py-1 rounded text-sm">{r.status}</span>
=======
    <div className="tasks-enhanced-bg min-h-screen flex flex-col items-center p-6 font-poppins relative overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-semibold mb-6 tasks-management-heading">Leave Requests</h2>
        <ul className="space-y-4">
          {requests.map(r => (
            <li key={r.id} className="bg-white p-4 rounded flex justify-between items-center shadow tasks-enhanced-table">
              <div className="text-black">
                <strong>{r.employee_name}</strong><br />
                {new Date(r.start_date).toLocaleDateString()} - {new Date(r.end_date).toLocaleDateString()}<br />
                <em>{r.reason}</em><br />
                <span className="mt-1 inline-block px-2 py-1 rounded text-sm" style={{ background: r.status === 'Pending' ? '#a32227' : r.status === 'Approved' ? '#16a34a' : '#a32227', color: '#fff' }}>{r.status}</span>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
              </div>
              <div className="space-y-1 text-right">
                {r.status === 'Pending' && (
                  <>
<<<<<<< HEAD
                    <button onClick={() => updateStatus(r.id, 'Approved')} className="text-green-300 hover:text-green-200">Approve</button>
                    <button onClick={() => updateStatus(r.id, 'Rejected')} className="text-red-300 hover:text-red-200">Reject</button>
                  </>
                )}
                <button onClick={() => handleDelete(r.id)} className="text-gray-300 hover:text-white text-sm">Delete</button>
=======
                    <button onClick={() => updateStatus(r.id, 'Approved')} className="tasks-enhanced-btn mr-2" style={{ background: '#16a34a' }}>Approve</button>
                    <button onClick={() => updateStatus(r.id, 'Rejected')} className="tasks-enhanced-btn" style={{ background: '#a32227' }}>Reject</button>
                  </>
                )}
                <button onClick={() => handleDelete(r.id)} className="tasks-enhanced-btn" style={{ background: '#fff', color: '#a32227', border: '1px solid #a32227', marginTop: 8 }}>Delete</button>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
              </div>
            </li>
          ))}
        </ul>
<<<<<<< HEAD
        <Link to="/superadmin-dashboard" className="mt-6 inline-block text-indigo-200 hover:text-white">Back to Dashboard</Link>
=======
        <Link to="/superadmin-dashboard" className="mt-6 inline-block" style={{ background: '#a32227', color: '#fff', borderRadius: '9999px', padding: '0.5rem 1.5rem', transition: 'background 0.2s' }}>Back to Dashboard</Link>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      </div>
    </div>
  );
}
