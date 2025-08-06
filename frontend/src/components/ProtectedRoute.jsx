import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

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

  // Check if role is in allowed roles
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
