import { useState } from "react";
import axios from "../api/axios";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", formData);
      alert("User registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="center-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "250px", margin: "20px auto" }}>
        <input 
          name="name"
          placeholder="Full Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password"
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Client">Client</option>
        </select>
        
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
