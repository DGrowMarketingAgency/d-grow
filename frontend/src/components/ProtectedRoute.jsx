import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  // Strict mapping of role → dashboard path
  const roleRoutes = {
    "Employee": "/employee-dashboard",
    "Admin": "/admin-dashboard",
    "Super Admin": "/superadmin-dashboard",
    "Client": "/client-dashboard",
  };

  // Check if current path matches the user's assigned dashboard
  const userDashboardPath = roleRoutes[role];
  if (location.pathname !== userDashboardPath) {
    return <Navigate to={userDashboardPath} replace />;
  }
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

  // Check if role is in allowed roles
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
