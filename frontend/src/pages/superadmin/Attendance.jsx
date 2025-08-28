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

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ check_in: '', check_out: '', status: 'Present' });
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchRecords = async () => {
      const res = await axios.get('/attendance/all', config);
      setRecords(res.data);
    };
    fetchRecords();
  }, []);

  const startEdit = (r) => {
    setEditing(r.id);
    setForm({
      check_in: r.check_in?.slice(0,16) || '',
      check_out: r.check_out?.slice(0,16) || '',
      status: r.status
    });
  };

  const saveEdit = async (id) => {
    await axios.put(`/attendance/${id}`, form, config);
    setRecords(records.map(r => r.id===id?{...r,...form}:r));
    setEditing(null);
  };

  const del = async (id) => {
    await axios.delete(`/attendance/${id}`, config);
    setRecords(records.filter(r=>r.id!==id));
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-indigo-800 flex justify-center p-6 font-poppins">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-white mb-4">Attendance Management</h2>
        <table className="min-w-full bg-white bg-opacity-20 rounded-md">
          <thead>
            <tr className="text-left text-gray-200">
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Check In</th>
              <th className="px-4 py-2">Check Out</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {records.map(r=>
              <tr key={r.id} className="border-t border-white border-opacity-20">
                <td className="px-4 py-2">{r.employee_name}</td>
                {editing===r.id ? (
                  <>   
                    <td className="px-4 py-2"><input type="datetime-local" value={form.check_in} onChange={e=>setForm({...form,check_in:e.target.value})} className="bg-white bg-opacity-20 text-white rounded px-2 py-1"/></td>
                    <td className="px-4 py-2"><input type="datetime-local" value={form.check_out} onChange={e=>setForm({...form,check_out:e.target.value})} className="bg-white bg-opacity-20 text-white rounded px-2 py-1"/></td>
                    <td className="px-4 py-2"><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="bg-white bg-opacity-20 text-white rounded px-2 py-1"><option>Present</option><option>Absent</option><option>Leave</option></select></td>
                    <td className="px-4 py-2 space-x-2"><button onClick={()=>saveEdit(r.id)} className="text-green-300">Save</button><button onClick={()=>setEditing(null)} className="text-gray-300">Cancel</button></td>
                  </>
                ):(
                  <>  
                    <td className="px-4 py-2">{r.check_in?new Date(r.check_in).toLocaleString():'N/A'}</td>
                    <td className="px-4 py-2">{r.check_out?new Date(r.check_out).toLocaleString():'N/A'}</td>
                    <td className="px-4 py-2">{r.status}</td>
                    <td className="px-4 py-2 space-x-2"><button onClick={()=>startEdit(r)} className="text-yellow-300">Edit</button><button onClick={()=>del(r.id)} className="text-red-300">Delete</button></td>
                  </>
                )}
              </tr>
            )}
          </tbody>
        </table>
        <Link to="/superadmin-dashboard" className="mt-6 inline-block text-indigo-200 hover:text-white">Back</Link>
=======
    <div className="tasks-enhanced-bg min-h-screen flex flex-col items-center p-6 font-poppins relative overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold mb-6 tasks-management-heading">Attendance Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full tasks-enhanced-table">
            <thead>
              <tr>
                <th className="px-4 py-2">Employee</th>
                <th className="px-4 py-2">Check In</th>
                <th className="px-4 py-2">Check Out</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r =>
                <tr key={r.id}>
                  <td className="px-4 py-2">{r.employee_name}</td>
                  {editing === r.id ? (
                    <>
                      <td className="px-4 py-2"><input type="datetime-local" value={form.check_in} onChange={e => setForm({ ...form, check_in: e.target.value })} className="tasks-custom-select" /></td>
                      <td className="px-4 py-2"><input type="datetime-local" value={form.check_out} onChange={e => setForm({ ...form, check_out: e.target.value })} className="tasks-custom-select" /></td>
                      <td className="px-4 py-2"><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="tasks-custom-select"><option>Present</option><option>Absent</option><option>Leave</option></select></td>
                      <td className="px-4 py-2 space-x-2"><button onClick={() => saveEdit(r.id)} className="tasks-enhanced-btn">Save</button><button onClick={() => setEditing(null)} className="tasks-enhanced-btn" style={{ background: '#fff', color: '#a32227', border: '1px solid #a32227' }}>Cancel</button></td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2">{r.check_in ? new Date(r.check_in).toLocaleString() : 'N/A'}</td>
                      <td className="px-4 py-2">{r.check_out ? new Date(r.check_out).toLocaleString() : 'N/A'}</td>
                      <td className="px-4 py-2">{r.status}</td>
                      <td className="px-4 py-2 space-x-2"><button onClick={() => startEdit(r)} className="tasks-enhanced-btn">Edit</button><button onClick={() => del(r.id)} className="tasks-enhanced-btn" style={{ background: '#fff', color: '#a32227', border: '1px solid #a32227' }}>Delete</button></td>
                    </>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Link to="/superadmin-dashboard" className="mt-6 inline-block" style={{ background: '#a32227', color: '#fff', borderRadius: '9999px', padding: '0.5rem 1.5rem', transition: 'background 0.2s' }}>Back to Dashboard</Link>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      </div>
    </div>
  );
}
