import React, { useState, useEffect } from "react";
import axios from '../api/axios';
import './DepartmentSelection.css';
import { useNavigate } from "react-router-dom";

const DepartmentSelection = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("id");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate();

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("/departments", authHeaders);
      setDepartments(res.data);
    } catch (error) {
      console.error("Error fetching departments:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleJoin = async () => {
    if (!selectedDept) return;
    try {
      const res = await axios.put(`/departments/${currentUserId}`, { department: selectedDept }, authHeaders);
      setMessage(res.data.message);
      localStorage.setItem("department", res.data.department); // store for future logins
      // Redirect to dashboard or refresh current page so that group chat loads
      navigate("/employee-dashboard");
    } catch (error) {
      console.error("Error joining department:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "300px", margin: "0 auto", borderRadius:"8px" }}>
      <h3>Select Your Department</h3>
      {departments.length === 0 ? (
        <p>No departments available.</p>
      ) : (
        <select className="department-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
          <option value="">-- Select Department --</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      )}
      <button onClick={handleJoin} style={{ marginTop: "1rem" }}>
        Join Department
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DepartmentSelection;