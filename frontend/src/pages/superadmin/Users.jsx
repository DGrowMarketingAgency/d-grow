import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import './Users.css';
import profileImg from '../../../profile.jpeg';

export default function Users() {
  const currentRole = localStorage.getItem('role');
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
  const res = await axios.get('/admin/employees', config);
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  
  // Handle deleting an employee (Manage Users section)
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;
    try {
      await axios.delete(`/admin/employees/${id}`, config);
      // Refresh list
      const res = await axios.get('/admin/employees', config);
      setUsers(res.data);
      alert('Employee deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.message || 'Error deleting employee');
    }
  };

  // Derived: filtered users by search query (name or email)
  const filteredUsers = users.filter(u => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q)
    );
  });
  return (
  <div className="users-page text-white min-h-screen brand-bg flex flex-col items-center p-8 font-poppins relative overflow-hidden" style={{ color: '#ffffff' }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md ring-1 ring-white ring-opacity-20 rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
        <div className="flex items-center mb-6">
          <img src={profileImg} alt="Profile" className="h-10 w-10 rounded-full object-cover mr-3" />
          <h2 className="text-4xl font-bold text-black hover:text-red-600 active:text-red-600 cursor-pointer">User Management</h2>
        </div>
        {/* Manage Roles: Search to find employee to delete */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search employee by name or email"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-white bg-opacity-20 text-black placeholder-black focus:bg-opacity-30 transition"
          />
        </div>
  {/* Manage Roles Section */}
  <h3 className="text-2xl font-semibold text-black mt-6 mb-3">Manage Roles</h3>
  <div className="overflow-x-auto">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 shadow-lg">
            <table className="min-w-full table-auto">
             <thead>
               <tr className="text-left text-white">
                <th className="px-4 py-3 bg-white bg-opacity-10 backdrop-blur-md sticky top-0">Name</th>
                <th className="px-4 py-3 bg-white bg-opacity-10 backdrop-blur-md sticky top-0">Email</th>
                <th className="px-4 py-3 bg-white bg-opacity-10 backdrop-blur-md sticky top-0">Role</th>
                <th className="px-4 py-3 bg-white bg-opacity-10 backdrop-blur-md sticky top-0">Actions</th>
               </tr>
             </thead>
            <tbody>
              {filteredUsers.length === 0 && (
                <tr>
                  <td className="px-4 py-4 text-black" colSpan={4}>No employees match your search.</td>
                </tr>
              )}
              {filteredUsers.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`${idx % 2 === 0 ? 'bg-white bg-opacity-10' : 'bg-white bg-opacity-5'} hover:bg-opacity-30 transition`}
                >
                  <td className="px-4 py-3 text-black hover:text-[#1c0607] transition-colors">{user.name}</td>
                  <td className="px-4 py-3 text-black hover:text-[#1c0607] transition-colors">{user.email}</td>
                  <td className="px-4 py-3 text-black hover:text-[#1c0607] transition-colors">{user.role}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
         </div>
        <div className="mt-6 text-right">
          <Link to="/superadmin-dashboard" className="inline-block px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
