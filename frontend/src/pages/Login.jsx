import React from "react";
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

import logo from "../../logo.png";

import './login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
  const { data } = await axios.post("/auth/login", { email, password, role });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("id", data.id);
      if (data.department) {
        localStorage.setItem("department", data.department);
      }
      if (data.access_rights) {
        localStorage.setItem("access_rights", JSON.stringify(data.access_rights));
      }
      const roleRoutes = {
        "Employee": "/employee-dashboard",
        "Admin": "/admin-dashboard",
        "Super Admin": "/superadmin-dashboard",
        "Client": "/client-dashboard"
      };
      navigate(roleRoutes[data.role]);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-poppins" style={{ background: 'linear-gradient(135deg, #fff 60%, #f3f4f8 100%)' }}>
      <div className="bg-black shadow-lg rounded-lg p-8 max-w-md w-full mx-4 animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" style={{ width: 140, height: 60, objectFit: 'contain', marginBottom: 8 }} />
        </div>
        <p className="text-center font-semibold mt-2 mb-6" style={{ color: '#fff' }}>Empowering Your Growth</p>
        <form onSubmit={handleLogin} className="space-y-4 text-white">
          <div className="flex justify-end">
            <select
              className="bg-gray-900 text-white px-3 py-2 rounded-md focus:outline-none focus:bg-gray-800 custom-white-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Employee</option>
              <option>Admin</option>
              <option>Super Admin</option>
              <option>Client</option>
            </select>
          </div>
          <div className="relative">
            <svg className="w-5 h-5 text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
            </svg>
            <input
              type="email"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white placeholder-gray-300 rounded-md focus:outline-none focus:bg-gray-800"
            />
          </div>
          <div className="relative">
            <svg className="w-5 h-5 text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a4 4 0 00-4 4v4h8V6a4 4 0 00-4-4z" />
              <path d="M4 10v6a2 2 0 002 2h8a2 2 0 002-2v-6H4z" />
            </svg>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white placeholder-gray-300 rounded-md focus:outline-none focus:bg-gray-800"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-lg shadow-lg hover:scale-105 transition transform"
            style={{ background: '#a32227', color: '#fff' }}
          >
            Login
          </button>
          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-500" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
