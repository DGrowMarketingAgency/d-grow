import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import './Projects.css';
import './ProjectsText.css';
=======
import './TasksEnhancedV2.css';
import './TasksInputRed.css';
import './TasksTableWhite.css';
import './TasksCustomSelect.css';
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', assigned_to: '' });
  const [userList, setUserList] = useState([]);
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, uRes] = await Promise.all([
          axios.get('/projects', config),
          axios.get('/employees', config)
        ]);
        setProjects(pRes.data);
        // Only include users with role 'Employee' in dropdown
        setUserList(uRes.data.filter(u => u.role === 'Employee'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
  await axios.post('/projects', form, config);
  const res = await axios.get('/projects', config);
      setProjects(res.data);
      setForm({ name: '', description: '', assigned_to: '' });
    } catch (err) { console.error(err); }
  };

  const updateStatus = async (id, status) => {
    console.log(`updateStatus called for project ${id} with status ${status}`);
    try {
      const res = await axios.put(`/projects/${id}/status`, { status }, config);
      console.log('updateStatus response:', res.data);
  // Refresh entire projects list to reflect updated status
  const listRes = await axios.get('/projects', config);
  setProjects(listRes.data);
  alert(`Project marked as ${status}`);
    } catch (err) {
      console.error('Error updating project status:', err);
      alert(err.response?.data?.message || 'Error updating project status');
    }
  };

  const handleDelete = async (id) => {
    try {
  await axios.delete(`/projects/${id}`, config);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) { console.error(err); }
  };

  return (
<<<<<<< HEAD
    <div className="projects-page min-h-screen bg-gradient-to-r from-purple-800 to-indigo-800 flex flex-col items-center p-6 font-poppins text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-white mb-6">Projects Management</h2>
=======
    <div className="projects-page tasks-enhanced-bg min-h-screen flex flex-col items-center p-6 font-poppins relative overflow-hidden">
      <div className="bg-transparent rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold mb-6 tasks-management-heading">Projects Management</h2>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
<<<<<<< HEAD
            className="px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-300"
=======
            className="tasks-custom-select"
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
<<<<<<< HEAD
            className="px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-300"
=======
            className="tasks-custom-select"
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
          />
          <select
            value={form.assigned_to}
            onChange={e => setForm({ ...form, assigned_to: e.target.value })}
<<<<<<< HEAD
            className="px-4 py-2 rounded bg-white bg-opacity-20 text-white"
=======
            className="tasks-custom-select"
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
            required
          >
            <option value="">Assign To</option>
            {userList.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
<<<<<<< HEAD
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-black rounded hover:bg-indigo-500 transition col-span-full">
=======
          <button type="submit" className="col-span-full tasks-enhanced-btn" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
            Create Project
          </button>
        </form>

<<<<<<< HEAD
        <table className="min-w-full bg-white bg-opacity-20 rounded-md">
          <thead>
            <tr className="text-left text-gray-200">
=======
        <table className="min-w-full tasks-enhanced-table">
          <thead>
            <tr>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
<<<<<<< HEAD
          <tbody className="text-white">
            {projects.map(p => (
              <tr key={p.id} className="border-t border-white border-opacity-20">
=======
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.employee_name || p.assigned_to}</td>
                <td className="px-4 py-2">{p.status || 'Pending'}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    type="button"
                    onClick={() => updateStatus(p.id, 'Completed')}
<<<<<<< HEAD
                    className="text-green-300 hover:text-green-200 text-sm"
=======
                    className="tasks-enhanced-btn"
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
                  >Complete</button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
<<<<<<< HEAD
                    className="text-red-300 hover:text-red-200 text-sm"
=======
                    className="tasks-enhanced-btn"
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

<<<<<<< HEAD
        <Link to="/superadmin-dashboard" className="mt-6 inline-block text-indigo-200 hover:text-white">Back to Dashboard</Link>
=======
        <Link to="/superadmin-dashboard" className="mt-6 inline-block" style={{ background: '#a32227', color: '#fff', borderRadius: '9999px', padding: '0.5rem 1.5rem', transition: 'background 0.2s' }}>Back to Dashboard</Link>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      </div>
    </div>
  );
}
