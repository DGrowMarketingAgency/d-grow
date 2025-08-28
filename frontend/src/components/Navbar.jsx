import { Link, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { useState } from "react";
=======
<<<<<<< HEAD
import { useState } from "react";
=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

export default function Navbar() {
  const location = useLocation();

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
  // Hide navbar on dashboards, show only on login
  const hideOnDashboard = location.pathname.includes("dashboard");
  if (hideOnDashboard) return null;
  const [showMenu, setShowMenu] = useState(false);
<<<<<<< HEAD
=======
=======
  // Hide navbar on dashboards, show only on login/register
  const hideOnDashboard = location.pathname.includes("dashboard");
  if (hideOnDashboard) return null;
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowMenu(prev => !prev)}
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "5px 10px",
            cursor: "pointer"
          }}
        >
          Account
        </button>
        {showMenu && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              background: "#282c34",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}
          >
            <Link
              to="/login"
              onClick={() => setShowMenu(false)}
              style={{ color: "white", textDecoration: "none", margin: "5px 0" }}
            >
              Login
            </Link>
          </div>
        )}
<<<<<<< HEAD
=======
=======
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      </div>
    </nav>
  );
}
