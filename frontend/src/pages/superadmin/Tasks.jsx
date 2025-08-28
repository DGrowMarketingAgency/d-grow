<<<<<<< HEAD
=======
import './TasksEnhancedV2.css';
import './TasksInputRed.css';
import './TasksTableWhite.css';
import './TasksCustomSelect.css';
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import './Tasks.css';
<<<<<<< HEAD
=======
import './TasksEnhanced.css';
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', assigned_to: '', department: '', is_urgent: false });
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    // Separate fetch calls so departments dropdown always populates
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/tasks', config);
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('/employees', config);
        setEmployees(res.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('/departments', config);
        setDepartments(res.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };
    fetchTasks();
    fetchEmployees();
    fetchDepartments();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/tasks', form, config);
      const res = await axios.get('/tasks', config);
      setTasks(res.data);
      setForm({ title: '', description: '', assigned_to: '', department: '', is_urgent: false });
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/tasks/${id}`, { status }, config);
      setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`, config);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
<<<<<<< HEAD
  <div className="tasks-page min-h-screen bg-gradient-to-r from-purple-800 to-indigo-800 flex flex-col items-center p-6 font-poppins relative overflow-hidden">
=======
  <div className="tasks-page tasks-enhanced-bg min-h-screen flex flex-col items-center p-6 font-poppins relative overflow-hidden">
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      {/* Gradient wave overlays */}
      <div className="wave wave-top"></div>
      <div className="wave wave-bottom"></div>

      {/* Flashing light overlay effect */}
      <div className="flash-overlay"></div>

<<<<<<< HEAD
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-white mb-6">Tasks Management</h2>
=======

      <div className="bg-transparent rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold mb-6 tasks-management-heading">Tasks Management</h2>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
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
            {employees.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <select
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
<<<<<<< HEAD
            className="px-4 py-2 rounded bg-white bg-opacity-20 text-white"
=======
            className="tasks-custom-select"
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
            required
          >
            <option value="">Department</option>
            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
<<<<<<< HEAD
          <label className="flex items-center space-x-2 text-white">
=======
          <label className="flex items-center space-x-2" style={{ color: '#a32227', fontWeight: 600 }}>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
            <input
              type="checkbox"
              checked={form.is_urgent}
              onChange={e => setForm({ ...form, is_urgent: e.target.checked })}
<<<<<<< HEAD
              className="form-checkbox h-5 w-5 text-red-500 bg-white bg-opacity-20"
            />
            <span>Urgent</span>
          </label>
          <button type="submit" className="col-span-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition">
=======
              className="form-checkbox h-5 w-5"
              style={{ accentColor: '#a32227', border: '2px solid #a32227' }}
            />
            <span>Urgent</span>
          </label>
          <button type="submit" className="col-span-full tasks-enhanced-btn" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
            Create Task
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
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Urgent</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
<<<<<<< HEAD
          <tbody className="text-white">
            {tasks.map(t => (
              <tr key={t.id} className="border-t border-white border-opacity-20">
=======
          <tbody>
            {tasks.map(t => (
              <tr key={t.id}>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
                <td className="px-4 py-2">{t.title}</td>
                <td className="px-4 py-2">{t.employee_name || t.assigned_to}</td>
                <td className="px-4 py-2">{t.department}</td>
                <td className="px-4 py-2">{t.is_urgent ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">{t.status || 'Pending'}</td>
                <td className="px-4 py-2 space-x-2">
<<<<<<< HEAD
                  <button onClick={() => updateStatus(t.id, 'Completed')} className="text-black hover:text-gray-700 text-sm">Complete</button>
                  <button onClick={() => handleDelete(t.id)} className="text-black hover:text-gray-700 text-sm">Delete</button>
=======
                  <button onClick={() => updateStatus(t.id, 'Completed')} className="tasks-enhanced-btn">Complete</button>
                  <button onClick={() => handleDelete(t.id)} className="tasks-enhanced-btn">Delete</button>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-center">
<<<<<<< HEAD
          <Link to="/superadmin-dashboard" className="inline-block px-6 py-2 bg-indigo-600 bg-opacity-75 text-white rounded-full hover:bg-opacity-100 transition">
=======
          <Link to="/superadmin-dashboard" className="inline-block px-6 py-2" style={{ background: '#a32227', color: '#fff', borderRadius: '9999px', transition: 'background 0.2s' }}>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
