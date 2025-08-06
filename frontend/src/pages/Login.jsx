import { useState } from "react";
import axios from "../api/axios";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("id", data.id);
      if (data.department) {
      localStorage.setItem("department", data.department);
    }
    if(data.access_rights){
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
    </div>
  );
}
