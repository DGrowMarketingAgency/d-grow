import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import './Reports.css';

export default function Reports() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchDepts = async () => {
      try {
  const res = await axios.get('/departments', config);
        setDepartments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepts();
  }, []);

  const handleDownload = async () => {
    if (!selectedDept) return;
    try {
      const response = await axios.get(
        `/reports/status?department=${encodeURIComponent(selectedDept)}`,
        { ...config, responseType: 'blob' }
      );
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Status_Report_${selectedDept}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading report:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-poppins">
  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md reports-page">
        <h2 className="text-3xl font-semibold text-black mb-6">Download Department Report</h2>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-white text-black"
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>
        <button
          onClick={handleDownload}
          disabled={!selectedDept}
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition disabled:opacity-50"
        >
          Download PDF
        </button>
        <Link to="/superadmin-dashboard" className="mt-6 inline-block text-indigo-200 hover:text-white">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
