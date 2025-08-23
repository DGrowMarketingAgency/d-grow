import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

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
              </div>
              <div className="space-y-1 text-right">
                {r.status === 'Pending' && (
                  <>
                    <button onClick={() => updateStatus(r.id, 'Approved')} className="text-green-300 hover:text-green-200">Approve</button>
                    <button onClick={() => updateStatus(r.id, 'Rejected')} className="text-red-300 hover:text-red-200">Reject</button>
                  </>
                )}
                <button onClick={() => handleDelete(r.id)} className="text-gray-300 hover:text-white text-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/superadmin-dashboard" className="mt-6 inline-block text-indigo-200 hover:text-white">Back to Dashboard</Link>
      </div>
    </div>
  );
}
