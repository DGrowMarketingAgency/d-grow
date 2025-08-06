import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Hide navbar on dashboards, show only on login/register
  const hideOnDashboard = location.pathname.includes("dashboard");
  if (hideOnDashboard) return null;

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      background: "#282c34",
      color: "white"
    }}>
      <h3>Employee Management</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
      </div>
    </nav>
  );
}
