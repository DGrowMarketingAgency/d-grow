<<<<<<< HEAD
=======
<<<<<<< HEAD
import React from "react";
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
=======
import logo from "../../logo.png";

import './login.css';
=======
import { useState } from "react";
import axios from "../api/axios";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [role, setRole] = useState("Employee");
=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
  const { data } = await axios.post("/auth/login", { email, password, role });
=======
<<<<<<< HEAD
  const { data } = await axios.post("/auth/login", { email, password, role });
=======
      const { data } = await axios.post("/auth/login", { email, password });
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("id", data.id);
      if (data.department) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
        localStorage.setItem("department", data.department);
      }
      if (data.access_rights) {
        localStorage.setItem("access_rights", JSON.stringify(data.access_rights));
      }
<<<<<<< HEAD
=======
=======
      localStorage.setItem("department", data.department);
    }
    if(data.access_rights){
  localStorage.setItem("access_rights", JSON.stringify(data.access_rights));
}
      
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      const roleRoutes = {
        "Employee": "/employee-dashboard",
        "Admin": "/admin-dashboard",
        "Super Admin": "/superadmin-dashboard",
        "Client": "/client-dashboard"
      };
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      navigate(roleRoutes[data.role]);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-purple-900 to-gray-800 font-poppins">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg p-8 max-w-md w-full mx-4 animate-fadeIn">
        <h1 className="text-4xl font-bold text-white text-center">D Grow</h1>
        <p className="text-center text-gray-200 mt-2 mb-6">Empowering Your Growth</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex justify-end">
            <select
              className="bg-white bg-opacity-20 text-white px-3 py-2 rounded-md focus:outline-none focus:bg-opacity-30"
=======
<<<<<<< HEAD
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
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
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
<<<<<<< HEAD
              className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-md focus:outline-none focus:bg-opacity-30"
=======
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white placeholder-gray-300 rounded-md focus:outline-none focus:bg-gray-800"
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
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
<<<<<<< HEAD
              className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-md focus:outline-none focus:bg-opacity-30"
=======
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white placeholder-gray-300 rounded-md focus:outline-none focus:bg-gray-800"
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
            />
          </div>
          <button
            type="submit"
<<<<<<< HEAD
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition transform"
          >
            Login
          </button>
          <div className="flex items-center justify-between text-sm text-gray-200">
=======
            className="w-full py-3 font-semibold rounded-lg shadow-lg hover:scale-105 transition transform"
            style={{ background: '#a32227', color: '#fff' }}
          >
            Login
          </button>
          <div className="flex items-center justify-between text-sm text-gray-300">
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-500" />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>
        </form>
      </div>
<<<<<<< HEAD
=======
=======
    <div className="center-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "250px", margin: "20px auto" }}>
        <input 
          placeholder="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          placeholder="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
    </div>
  );
}
