import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import './Departments.css';

export default function Departments() {
  const [depts, setDepts] = useState([]);
  const [newDept, setNewDept] = useState('');
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchDepts = async () => {
      try {
  console.log('Fetching departments');
  const res = await axios.get('/departments', config);
  console.log('Departments fetched:', res.data);
  setDepts(res.data);
      } catch (err) { console.error(err); }
    };
    fetchDepts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log('Creating department:', newDept);
    if (!newDept) {
      alert('Please enter a department name');
      return;
    }
    try {
      const createRes = await axios.post('/departments', { name: newDept }, config);
      console.log('Create response:', createRes.data);
      setNewDept('');
      alert(`Department "${createRes.name || newDept}" added successfully`);
      const res = await axios.get('/departments', config);
      setDepts(res.data);
    } catch (err) {
      console.error('Error creating department:', err);
      alert(err.response?.data?.message || 'Error adding department');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/departments/${id}`, config);
      setDepts(prev => prev.filter(d => d.id !== id));
    } catch (err) { console.error(err); }
  };

  return (
<<<<<<< HEAD
  <div className="departments-page min-h-screen brand-bg flex items-center justify-center p-6 font-poppins text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-white mb-4">Departments</h2>
        <ul className="space-y-2 mb-6">
          {depts.map(d => (
            <li key={d.id} className="flex justify-between items-center bg-white bg-opacity-20 text-white px-4 py-2 rounded">
              {d.name}
              <button onClick={() => handleDelete(d.id)} className="text-black hover:text-black">Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreate} className="flex space-x-2 mb-4">
          <input value={newDept} onChange={e => setNewDept(e.target.value)} placeholder="New Department" className="flex-1 px-4 py-2 rounded bg-white bg-opacity-20 text-white" />
          <button type="submit" className="px-4 py-2 bg-indigo-600 rounded text-black hover:text-black hover:bg-indigo-500">Add</button>
        </form>
        <Link to="/superadmin-dashboard" className="text-indigo-200 hover:text-white">Back</Link>
=======
    <div className="departments-page">
      <div className="glass-card">
        <h2>Departments</h2>
        <ul>
          {depts.map(d => (
            <li key={d.id}>
              {d.name}
              <button onClick={() => handleDelete(d.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            value={newDept}
            onChange={e => setNewDept(e.target.value)}
            placeholder="New Department"
          />
          <button type="submit">Add</button>
        </form>
        <Link to="/superadmin-dashboard">Back</Link>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      </div>
    </div>
  );
}
