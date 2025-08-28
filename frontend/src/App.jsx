<<<<<<< HEAD
=======
import React from "react";
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import "./App.css"
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import ClientDashboard from "./pages/dashboards/ClientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Notifications from './pages/superadmin/Notifications';
import Users from './pages/superadmin/Users';
import Departments from './pages/superadmin/Departments';
import Tasks from './pages/superadmin/Tasks';
import Projects from './pages/superadmin/Projects';
import Payments from './pages/superadmin/Payments';
import Attendance from './pages/superadmin/Attendance';
import LeaveRequests from './pages/superadmin/LeaveRequests';
import Chat from './pages/superadmin/Chat';
import Reports from './pages/superadmin/Reports';
import GroupChat from './pages/superadmin/GroupChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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

        {/* Superadmin subpages */}
        <Route path="/superadmin-dashboard/notifications" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/superadmin-dashboard/users" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <Users />
          </ProtectedRoute>
        } />
        <Route path="/superadmin-dashboard/departments" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <Departments />
          </ProtectedRoute>
        } />
        <Route path="/superadmin-dashboard/tasks" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <Tasks />
          </ProtectedRoute>
        } />
        <Route path="/superadmin-dashboard/projects" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <Projects />
          </ProtectedRoute>
        } />
        <Route path="/superadmin-dashboard/payments" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <Payments />
          </ProtectedRoute>
        } />
        <Route path="/superadmin-dashboard/attendance" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <Attendance />
          </ProtectedRoute>
        } />
        <Route path="/superadmin-dashboard/leave-requests" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <LeaveRequests />
          </ProtectedRoute>
        } />
        <Route path="/superadmin-dashboard/chat" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/superadmin-dashboard/group-chat" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <GroupChat />
          </ProtectedRoute>
        } />
        <Route path="/superadmin-dashboard/reports" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <Reports />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
