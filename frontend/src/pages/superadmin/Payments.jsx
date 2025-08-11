import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import './TasksEnhancedV2.css';
import './TasksInputRed.css';
import './TasksTableWhite.css';
import './TasksCustomSelect.css';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ label: '', payment_date: '', amount: '' });
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/payments', config);
        setPayments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/payments', form, config);
      const res = await axios.get('/api/payments', config);
      setPayments(res.data);
      setForm({ label: '', payment_date: '', amount: '' });
    } catch (err) { console.error(err); }
  };

  const markPaid = async (id) => {
    try {
      await axios.patch(`/api/payments/${id}/paid`, {}, config);
      setPayments(payments.map(p => p.id === id ? { ...p, is_paid: true } : p));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/payments/${id}`, config);
      setPayments(prev => prev.filter(p => p.id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="payments-page tasks-enhanced-bg min-h-screen flex flex-col items-center p-6 font-poppins relative overflow-hidden">
      <div className="bg-transparent rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold mb-6 tasks-management-heading">Payment Reminders</h2>

        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Label"
            value={form.label}
            onChange={e => setForm({ ...form, label: e.target.value })}
            className="tasks-custom-select"
            required
          />
          <input
            type="date"
            value={form.payment_date}
            onChange={e => setForm({ ...form, payment_date: e.target.value })}
            className="tasks-custom-select"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            className="tasks-custom-select"
          />
          <button type="submit" className="col-span-full tasks-enhanced-btn" style={{ fontSize: '1.1rem', fontWeight: 700 }}>Add</button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full tasks-enhanced-table">
            <thead>
              <tr>
                <th className="px-4 py-2">Label</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td className="px-4 py-2">{p.label}</td>
                  <td className="px-4 py-2">{new Date(p.payment_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{p.amount && `$${p.amount}`}</td>
                  <td className="px-4 py-2">{p.is_paid ? 'Paid' : 'Pending'}</td>
                  <td className="px-4 py-2 space-x-2">
                    {!p.is_paid && (
                      <button onClick={() => markPaid(p.id)} className="tasks-enhanced-btn" style={{ fontSize: '0.95rem', padding: '4px 14px' }}>Mark Paid</button>
                    )}
                    <button onClick={() => handleDelete(p.id)} className="tasks-enhanced-btn" style={{ fontSize: '0.95rem', padding: '4px 14px' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/superadmin-dashboard" className="mt-6 inline-block" style={{ background: '#a32227', color: '#fff', borderRadius: '9999px', padding: '0.5rem 1.5rem', transition: 'background 0.2s' }}>Back to Dashboard</Link>
      </div>
    </div>
  );
}
