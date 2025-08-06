import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import "./App.css"
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import ClientDashboard from "./pages/dashboards/ClientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/employee-dashboard" element={
          <ProtectedRoute allowedRoles={['Employee']}>
            <EmployeeDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={['Admin', 'Super Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/superadmin-dashboard" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/client-dashboard" element={
          <ProtectedRoute allowedRoles={['Client']}>
            <ClientDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
