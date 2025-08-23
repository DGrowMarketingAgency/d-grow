import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import PrivateChat from '../../components/PrivateChat';

export default function Chat() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch all employees on mount
  useEffect(() => {
    const fetchEmps = async () => {
      try {
        const res = await axios.get('/api/employees', config);
        setEmployees(res.data.filter(e => e.id !== parseInt(localStorage.getItem('id'))));
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmps();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-indigo-800 flex items-center justify-center p-6 font-poppins">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-lg">
        {!selected ? (
          <>
            <h2 className="text-3xl font-semibold text-white mb-4">Chat with Employees</h2>
            <ul className="space-y-2">
              {employees.map(emp => (
                <li key={emp.id}>
                  <button
                    onClick={() => setSelected(emp)}
                    className="w-full text-left px-4 py-2 bg-white bg-opacity-20 text-white rounded hover:bg-opacity-30 transition"
                  >
                    {emp.name} ({emp.role})
                  </button>
                </li>
              ))}
            </ul>
            <Link to="/superadmin-dashboard" className="mt-6 inline-block text-indigo-200 hover:text-white">
              Back to Dashboard
            </Link>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setSelected(null)}
                className="text-indigo-200 hover:text-white"
              >
                &larr; Back
              </button>
              <h2 className="text-2xl font-semibold text-white">Chat: {selected.name}</h2>
            </div>
            <PrivateChat
              receiverId={selected.id}
              receiverName={selected.name}
              onClose={() => setSelected(null)}
            />
          </>
        )}
      </div>
    </div>
  );
}
