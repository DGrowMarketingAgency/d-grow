<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
=======
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from '../../api/axios';
import PrivateChat from '../../components/PrivateChat';
import SuperAdminNotifications from '../../components/SuperAdminNotifications';
<<<<<<< HEAD
import './SuperAdminDashboardUsers.css';
=======
import '../UserCard.css';
import '../ChatButton.css';
import '../SuperAdminChatButton.css';
import '../SuperAdminUserCard.css';
import '../SuperAdminUserCardV2.css';
import '../SuperAdminUserCardV3.css';
import '../SuperAdminUserCardV4.css';
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import './SuperAdminDashboard.css';
import logo from '../../../logo.png';

export default function SuperAdminDashboard() {
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
  // Mock chart data
  const recentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Actions',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(255,255,255,0.6)',
    }]
  };
  const healthData = {
    labels: ['1h ago', '2h ago', '3h ago', '4h ago', '5h ago'],
    datasets: [{
      label: 'CPU %',
      data: [65, 59, 80, 75, 60],
      borderColor: 'rgba(0, 255, 255, 0.7)',
      backgroundColor: 'rgba(0, 255, 255, 0.3)',
      fill: true,
    }]
  };
  const userStatsData = {
    labels: ['Active', 'Inactive'],
    datasets: [{
      data: [200, 50],
      backgroundColor: ['rgba(0, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.4)'],
    }]
  };
  // Line chart options
  const lineOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: '#0ff' } } },
    scales: {
      x: { ticks: { color: '#fff' } },
      y: { ticks: { color: '#fff' } },
    },
  };
  const name = localStorage.getItem('name') || 'SuperAdmin';
  const token = localStorage.getItem('token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
  // State for private chat
  const [employees, setEmployees] = useState([]);
  const [chatReceiver, setChatReceiver] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  // Sidebar toggle state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menu = [
<<<<<<< HEAD
  { title: 'Notifications', action: () => setActiveTab('notifications') },
  { title: 'Users', action: () => setActiveTab('users') },
=======
    { title: 'Notifications', action: () => setActiveTab('notifications') },
    { title: 'Users', action: () => setActiveTab('users') },
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
    { title: 'Departments', path: '/superadmin-dashboard/departments' },
    { title: 'Tasks', path: '/superadmin-dashboard/tasks' },
    { title: 'Projects', path: '/superadmin-dashboard/projects' },
    { title: 'Payments', path: '/superadmin-dashboard/payments' },
    { title: 'Attendance', path: '/superadmin-dashboard/attendance' },
    { title: 'Leave', path: '/superadmin-dashboard/leave-requests' },
<<<<<<< HEAD
    { title: 'Chat', path: '/superadmin-dashboard/chat' },
=======
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
    { title: 'Group Chat', path: '/superadmin-dashboard/group-chat' },
  ];
  // Fetch employee list for private chat
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/employees', authHeaders);
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };
  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/notifications', authHeaders);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };
  useEffect(() => { fetchEmployees(); }, []);
  useEffect(() => {
    if (activeTab === 'notifications') fetchNotifications();
  }, [activeTab]);

  return (
<<<<<<< HEAD
    <div className={`superadmin-dashboard ${activeTab === 'users' ? 'users-bg' : ''} brand-bg flex h-screen overflow-hidden font-poppins text-red-color`}>
=======
    <div
      className={`superadmin-dashboard ${activeTab === 'users' ? 'users-bg' : 'brand-bg'} flex h-screen overflow-hidden font-poppins text-red-color`}
    >
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
    {/* Hamburger trigger (shown when sidebar closed) */}
    {!sidebarOpen && (
      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute top-4 left-4 z-20 text-white p-2 focus:outline-none"
      >
        ☰
      </button>
    )}
  {/* Sidebar */}
  <aside
      className={`${sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full'} brand-bg flex flex-col items-start py-8 space-y-6 fixed top-0 left-0 h-full transition-all duration-300 overflow-y-auto overflow-x-hidden z-10`}
    >
      {/* Close button (shown when sidebar open) */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 focus:outline-none close-btn"
        >
          ×
        </button>
      )}
      {/* Sidebar menu */}
      {menu.map((m) => (
        m.path ? (
          <Link
            key={m.title}
            to={m.path}
            className="w-full p-3 text-white rounded hover:bg-white hover:bg-opacity-25 hover:text-indigo-300 transition text-left"
          >
            {m.title}
          </Link>
        ) : (
          <button
            key={m.title}
            onClick={m.action}
            className="w-full p-3 text-white bg-transparent rounded hover:bg-white hover:bg-opacity-25 hover:text-indigo-300 transition text-left"
          >
            {m.title}
          </button>
        )
      ))}
    </aside>
   {/* Main area shifts when sidebar open */}
<<<<<<< HEAD
    <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} flex-1 flex flex-col bg-transparent overflow-y-auto relative text-red-color transition-all duration-300`}>
=======
    <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} flex-1 flex flex-col ${activeTab === 'dashboard' ? 'bg-white' : 'bg-transparent'} overflow-y-auto relative text-red-color transition-all duration-300`}>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
         {/* Top bar */}
  <header className="flex items-center justify-between bg-transparent backdrop-blur-md p-4 sticky top-0 z-10">
           <div className="flex items-center">
             <img src={logo} alt="D Grow Logo" className="h-12 w-auto ml-12" />
           </div>
           <button
<<<<<<< HEAD
             onClick={() => localStorage.clear()}
=======
             onClick={() => {
               localStorage.clear();
               navigate('/login');
             }}
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
             className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-105 transform transition"
           >Logout</button>
         </header>
         {/* Content */}
        <main className="p-6 space-y-8">
          {activeTab === 'dashboard' && (
          <>
          {/* Welcome Banner */}
          <div className="welcome-banner bg-[#1c0607] backdrop-blur-md rounded-lg p-6 flex items-center space-x-4 shadow-lg animate-fadeIn">
              <div
                className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-xl avatar-text"
              >
                {name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl welcome-title">Welcome, {name}</h2>
                <p className="welcome-subtitle">Super Admin Dashboard</p>
              </div>
            </div>
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Define navigable actions */}
            { [
              { title: 'Add User', path: '/superadmin-dashboard/users' },
              { title: 'Manage Roles', path: '/superadmin-dashboard/users' },
              { title: 'View Reports', path: '/superadmin-dashboard/reports' }
            ].map(({ title, path }) => (
              <Link
                key={title}
                to={path}
<<<<<<< HEAD
                className="block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg shadow-lg transform hover:scale-105 transition animate-fadeIn"
=======
                className={
                  title === 'Add User'
                    ? 'block text-center bg-[#a32227] text-white py-4 rounded-lg shadow-lg transform hover:scale-105 transition animate-fadeIn'
                    : 'block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg shadow-lg transform hover:scale-105 transition animate-fadeIn'
                }
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
              >
                {title}
              </Link>
            ))}
          </div>
          {/* Glass Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Recent Activity Chart */}
            <div className="bg-[#1c0607] backdrop-blur-md p-6 rounded-lg shadow-lg animate-fadeIn hover:shadow-xl transition text-white">
              <h3 className="text-white font-semibold mb-2">Recent Activity</h3>
              <Bar data={recentData} options={{ responsive: true, plugins: { legend: { labels: { color: '#fff' } } }, scales: { x: { ticks: { color: '#fff' } }, y: { ticks: { color: '#fff' } } } }} />
            </div>
            {/* System Health Chart */}
            <div className="bg-[#1c0607] backdrop-blur-md p-6 rounded-lg shadow-lg animate-fadeIn hover:shadow-xl transition text-white delay-100">
              <h3 className="text-white font-semibold mb-2">System Health</h3>
              <Line data={healthData} options={{ responsive: true, plugins: { legend: { labels: { color: '#fff' } } }, scales: { x: { ticks: { color: '#fff' } }, y: { ticks: { color: '#fff' } } } }} />
            </div>
<<<<<<< HEAD
            {/* User Stats Chart */}
            <div className="bg-[#1c0607] backdrop-blur-md p-6 rounded-lg shadow-lg animate-fadeIn hover:shadow-xl transition text-white delay-200">
              <h3 className="text-white font-semibold mb-2">User Stats</h3>
              <Doughnut data={userStatsData} options={{ responsive: true, plugins: { legend: { labels: { color: '#fff' } } } }} />
=======
            {/* Attendance Card (black) */}
            <div className="bg-black p-6 rounded-lg shadow-lg animate-fadeIn hover:shadow-xl transition text-white delay-200">
              <h3 className="font-semibold mb-2" style={{ color: '#a32227' }}>Attendance</h3>
              <p className="mb-2">View and manage employee attendance records.</p>
              <Link to="/superadmin-dashboard/attendance" className="inline-block mt-2 px-4 py-2 rounded-full" style={{ background: '#a32227', color: '#fff', fontWeight: 600 }}>Go to Attendance</Link>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
            </div>
          </div>
          </>
          )}
          {activeTab === 'notifications' && (
            <SuperAdminNotifications />
          )}
          {activeTab === 'users' && (
<<<<<<< HEAD
            <section className="superadmin-users bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-neu p-6" style={{ color: '#ffffff' }}>
              <h2 className="text-2xl font-bold mb-4">Users</h2>
              <ul className="space-y-4">
                {employees.map(emp => (
                                  <li key={emp.id} className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-lg flex justify-between items-center">
                    <span className="font-medium">{emp.name} ({emp.email})</span>
                    <button onClick={() => setChatReceiver({ id: emp.id, name: emp.name })} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-current rounded">Chat</button>
=======
            <section className="superadmin-users rounded-xl shadow-neu p-6" style={{ background: '#000' }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#fff' }}>Users</h2>
              <ul className="space-y-4">
                {employees.map(emp => (
                  <li key={emp.id} className="superadmin-user-card-v4">
                    <span className="font-medium user-card-text">{emp.name} ({emp.email})</span>
                    <button onClick={() => setChatReceiver({ id: emp.id, name: emp.name })} className="superadmin-chat-btn px-3 py-1 rounded">Chat</button>
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
                  </li>
                ))}
              </ul>
            </section>
          )}
          {chatReceiver && (
            <section className="mt-6 p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-neu">
              <button onClick={() => setChatReceiver(null)} className="mb-4 text-sm text-gray-300 hover:underline">← Back to Users</button>
              <PrivateChat receiverId={chatReceiver.id} receiverName={chatReceiver.name} onClose={() => setChatReceiver(null)} />
            </section>
          )}
        </main>
      </div>
<<<<<<< HEAD
=======
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeptGroupChat from "../../components/DeptGroupChat";
import DepartmentSelection from "../../components/DepartmentSelection";
import PrivateChat from "../../components/PrivateChat";
import { io } from "socket.io-client";

axios.defaults.baseURL = "http://localhost:5000";

export default function SuperAdminDashboard() {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("id"), 10);
  const assignedDept = localStorage.getItem("department");
  const [accessUpdates, setAccessUpdates] = useState({});



  const navigate = useNavigate();
  
  // State for editing employees (only employees view)
  const [employees, setEmployees] = useState([]);
  
  // State for chat employees (all employees from /api/employees)
  const [chatEmployees, setChatEmployees] = useState([]);
  
  // Chat related state
  const [chatNotifications, setChatNotifications] = useState([]);
  const [chatSelectedReceiver, setChatSelectedReceiver] = useState(null);

  const [departmentList, setDepartmentList] = useState([]);
  const [deptUpdates, setDeptUpdates] = useState({}); // { employeeId: selectedDepartment }


  // Other states for tasks, attendance, leaveRequests, etc.
  const [attendance, setAttendance] = useState([]);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [editAttendanceForm, setEditAttendanceForm] = useState({
    check_in: "",
    check_out: "",
    status: "Present",
  });

  const [message, setMessage] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [editForm, setEditForm] = useState({ name: "", email: "", role: "", password: "" });
  // State
  const [leaveRequests, setLeaveRequests] = useState([]);


  // Task states
  const [taskForm, setTaskForm] = useState({ title: "", description: "", assigned_to: "" });
  const [tasks, setTasks] = useState([]);

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch employees for editing/updating (only employees)
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/employees", authHeaders);
      setEmployees(res.data);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

const updateEmployeeAccess = async (employeeId) => {
  const newAccess = accessUpdates[employeeId];
  if (!newAccess) {
    setMessage("Please update at least one access right for this employee.");
    return;
  }
  try {
    await axios.put(`/api/access/${employeeId}`, { access: newAccess }, authHeaders);
    setMessage("Access rights updated successfully");
    // Reload employees to get the updated access rights from the DB.
    fetchEmployees();
    // Clear the temporary update for this employee so that the checkboxes now show the updated value.
    setAccessUpdates((prev) => {
      const newState = { ...prev };
      delete newState[employeeId];
      return newState;
    });
  } catch (error) {
    setMessage(error.response?.data?.message || "Failed to update access rights");
  }
};


  const fetchDepartments = async () => {
  try {
    const res = await axios.get("/api/departments", authHeaders);
    setDepartmentList(res.data);
  } catch (error) {
    console.error("Error fetching departments:", error.response?.data?.message || error.message);
  }
};

  // Fetch chat employees (all employees) from /api/employees
  const fetchChatEmployees = async () => {
    try {
      const res = await axios.get("/api/employees", authHeaders);
      setChatEmployees(res.data);
    } catch (error) {
      console.error("Error fetching chat employees:", error.response?.data?.message);
    }
  };
  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks", authHeaders);
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };


  // Fetch all attendance
const fetchAttendance = async () => {
  try {
    const res = await axios.get("/attendance/all", authHeaders);
    console.log("Attendance API response:", res.data); // ✅ Add this
    setAttendance(res.data);
  } catch (err) {
    console.error("Attendance Fetch Error:", err.response?.data || err.message);
  }
};


  // Fetch Leave Requests
const fetchLeaveRequests = async () => {
  try {
    const res = await axios.get("/leaves/all", authHeaders);
    setLeaveRequests(res.data);
  } catch (err) {
    console.error(err.response?.data?.message || "Failed to fetch leave requests");
  }
};

  // Fetch notifications for admin (chat notifications)
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/notifications", authHeaders);
      setChatNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchChatEmployees();
    fetchTasks();
    fetchAttendance();
    fetchLeaveRequests();
    fetchNotifications();
    fetchDepartments();
  }, []);

  // Setup Socket.io for dynamic notifications
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.emit("register", currentUserId);
    socket.on("new_notification", (data) => {
      setChatNotifications((prev) => [data, ...prev]);
    });
    return () => socket.disconnect();
  }, [currentUserId]);

  // Functions to mark and delete notifications (same as before)
  const markChatNotificationAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`, {}, authHeaders);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error.response?.data?.message);
    }
  };

  const deleteChatNotification = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`, authHeaders);
      fetchNotifications();
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting notification:", error.response?.data?.message);
    }
  };

const updateEmployeeDepartment = async (employeeId) => {
  const newDept = deptUpdates[employeeId];
  if (!newDept) {
    setMessage("Please select a department first");
    return;
  }
  try {
    await axios.put(`/api/departments/${employeeId}`, { department: newDept }, authHeaders);
    setMessage("Department updated successfully");
    // Refresh the employee list
    fetchEmployees();
  } catch (error) {
    setMessage(error.response?.data?.message || "Failed to update department");
  }
};

const deleteEmployee = async (id) => {
  try {
    const res = await axios.delete(`/admin/employees/${id}`, authHeaders);
    setMessage(res.data.message);
    fetchEmployees();
  } catch (err) {
    setMessage(err.response?.data?.message || "Failed to delete employee");
  }
};

  // ✅ Start Editing Employee
  const startEdit = (emp) => {
    setEditingEmployee(emp.id);
    setEditForm({ name: emp.name, email: emp.email, role: emp.role, password: "" });
  };

const saveEdit = async () => {
  try {
    const res = await axios.put(
      `/admin/employees/${editingEmployee}`,
      editForm,
      authHeaders
    );
    setMessage(res.data.message);
    setEditingEmployee(null);
    fetchEmployees();
  } catch (err) {
    setMessage(err.response?.data?.message || "Failed to update employee");
  }
};

  // ✅ Cancel Edit
  const cancelEdit = () => {
    setEditingEmployee(null);
    setEditForm({ name: "", email: "", role: "", password: "" });
  };

  // ✅ Task Management
  const addTask = async () => {
    if (!taskForm.title || !taskForm.assigned_to) {
      setMessage("Task title and assigned employee required");
      return;
    }

    try {
      await axios.post("/tasks", taskForm, authHeaders);
      setMessage("Task assigned successfully");
      setTaskForm({ title: "", description: "", assigned_to: "" });
      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to assign task");
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      const res = await axios.put(`/tasks/${id}`, { status }, authHeaders);
      setMessage(res.data.message);
      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/tasks/${id}`, authHeaders);
      setMessage(res.data.message);
      fetchTasks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete task");
    }
  };

  // Start editing attendance
  const startAttendanceEdit = (record) => {
    setEditingAttendance(record.id);
    setEditAttendanceForm({
      check_in: record.check_in ? record.check_in.slice(0, 16) : "",
      check_out: record.check_out ? record.check_out.slice(0, 16) : "",
      status: record.status,
    });
  };

  // Cancel edit
  const cancelAttendanceEdit = () => {
    setEditingAttendance(null);
    setEditAttendanceForm({ check_in: "", check_out: "", status: "Present" });
  };

  const leaveDepartment = async () => {
  try {
    await axios.put(`/api/departments/${currentUserId}`, { department: null }, authHeaders);
    localStorage.removeItem("department");
    // Optionally force a reload or update state so DepartmentSelection is shown:
    window.location.reload();
  } catch (error) {
    console.error("Error leaving department:", error.response?.data?.message || error.message);
  }
};

  // Save updated attendance
  const saveAttendance = async (id) => {
    try {
      const res = await axios.put(`/attendance/${id}`, editAttendanceForm, authHeaders);
      setMessage(res.data.message);
      setEditingAttendance(null);
      fetchAttendance();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update attendance");
    }
  };

  // Delete attendance
  const deleteAttendance = async (id) => {
    try {
      const res = await axios.delete(`/attendance/${id}`, authHeaders);
      setMessage(res.data.message);
      fetchAttendance();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete attendance");
    }
  };

  // Update Leave Status
const updateLeaveStatus = async (id, status) => {
  try {
    const res = await axios.put(`/leaves/${id}`, { status }, authHeaders);
    setMessage(res.data.message);
    fetchLeaveRequests();
  } catch (err) {
    setMessage(err.response?.data?.message || "Failed to update leave");
  }
};

const downloadAttendanceCsv = async () => {
  try {
    const response = await axios.get("/attendance/export", {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob' // ensure we receive binary data
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error downloading CSV", error);
  }
};

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Add this code within your component (and import useState if not already done)
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee", // default role; can be changed to "Admin"
  });

  // Create new user handler
  const createUser = async () => {
    const { name, email, password, role } = newUserForm;
    if (!name || !email || !password || !role) {
      setMessage("All fields are required");
      return;
    }
    try {
      // Call the registration endpoint with the role specified.
      const res = await axios.post(
        "/api/auth/register",
        { name, email, password, role },
        authHeaders
      );
      setMessage(`User ${res.data.name} created successfully as ${role}`);
      setNewUserForm({ name: "", email: "", password: "", role: "Employee" });
      // Update the employees list if the new user is an Employee or Admin.
      fetchEmployees();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div
      className="center-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        marginTop: "2rem",
      }}
    >
      <h1>Super Admin Dashboard</h1>
      <h2>Hello, {name}</h2>

{/* NEW: Notifications Panel for Chat */}
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", width: "300px" }}>
      <h3>Notifications</h3>
      {chatNotifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {chatNotifications.map((notif) => (
            <li
              key={notif.id}
              style={{ marginBottom: "0.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem", cursor: "pointer" }}
              onClick={() => {
                // When a notification indicates a new chat message, open chat with the sender.
                if (notif.message.includes("sent you a new message")) {
                  const senderName = notif.message.split(" sent you a new message")[0];
                  const emp = chatEmployees.find((e) => e.name === senderName);
                  if (emp) {
                    setChatSelectedReceiver(emp);
                  }
                }
              }}
            >
              <p>{notif.message}</p>
              <small>{new Date(notif.created_at).toLocaleString()}</small>
              <div style={{ marginTop: "0.5rem" }}>
                {!notif.is_read && (
                  <button
                    onClick={(e) => { e.stopPropagation(); markChatNotificationAsRead(notif.id); }}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Mark as Read
                  </button>
                )}
                <button onClick={(e) => { e.stopPropagation(); deleteChatNotification(notif.id); }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

          {/* NEW: Create New User Form */}
      <div style={{ 
  display: "flex", 
  flexDirection: "column", 
  gap: "0.5rem", 
  border: "1px solid #ccc", 
  padding: "1rem", 
  borderRadius: "8px", 
  width: "300px", 
  marginTop: "2rem" 
}}>
  <h3>Create New User</h3>
  <input
    type="text"
    placeholder="Name"
    value={newUserForm.name}
    onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
  />
  <input
    type="email"
    placeholder="Email"
    value={newUserForm.email}
    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
  />
  <input
    type="password"
    placeholder="Password"
    value={newUserForm.password}
    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
  />
  <select
    value={newUserForm.role}
    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
  >
    <option value="Employee">Employee</option>
    <option value="Admin">Admin</option>
  </select>
  <button onClick={createUser}>Create User</button>
</div>

      {/* Employee List */}
<h3>Employee List</h3>
<ul style={{ listStyle: "none", padding: 0 }}>
  {employees
    .filter(emp => emp.id !== currentUserId) // Exclude yourself
    .map((emp) => (
      <li
        key={emp.id}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        {editingEmployee === emp.id ? (
          <>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
            <select
              value={editForm.role}
              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
            >
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
              <option value="Client">Client</option>
            </select>
            <input
              type="password"
              placeholder="New Password (optional)"
              value={editForm.password}
              onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
            />
            <button onClick={saveEdit}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            {emp.name} ({emp.email}) - {emp.role}
            <button onClick={() => startEdit(emp)}>Update</button>
            <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
          </>
        )}
      </li>
    ))}
</ul>

<div style={{ marginTop: "2rem", width: "500px", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
  <h3>Manage Access Rights</h3>
  <ul style={{ listStyle: "none", padding: 0 }}>
    {employees
      .filter(emp => emp.id !== currentUserId)
      .map(emp => {
        // Use current access rights from emp.access_rights if available;
        // default to all features enabled if missing.
        const currentAccess = emp.access_rights || { private_chat: true, leave_request: true, group_chat: true };
        return (
          <li key={emp.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>
            <div>
              <strong>{emp.name}</strong> - Current Access:
              <span style={{ marginLeft: "0.5rem" }}>
                [Private Chat: {currentAccess.private_chat ? "Yes" : "No"}, 
                Leave Request: {currentAccess.leave_request ? "Yes" : "No"}, 
                Group Chat: {currentAccess.group_chat ? "Yes" : "No"}]
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginTop: "0.5rem" }}>
              <label>
                <input
                  type="checkbox"
                  checked={accessUpdates[emp.id]?.private_chat ?? currentAccess.private_chat}
                  onChange={(e) =>
                    setAccessUpdates({
                      ...accessUpdates,
                      [emp.id]: {
                        ... (accessUpdates[emp.id] || currentAccess),
                        private_chat: e.target.checked,
                      },
                    })
                  }
                />{" "}
                Allow Private Chat
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={accessUpdates[emp.id]?.leave_request ?? currentAccess.leave_request}
                  onChange={(e) =>
                    setAccessUpdates({
                      ...accessUpdates,
                      [emp.id]: {
                        ... (accessUpdates[emp.id] || currentAccess),
                        leave_request: e.target.checked,
                      },
                    })
                  }
                />{" "}
                Allow Leave Request
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={accessUpdates[emp.id]?.group_chat ?? currentAccess.group_chat}
                  onChange={(e) =>
                    setAccessUpdates({
                      ...accessUpdates,
                      [emp.id]: {
                        ... (accessUpdates[emp.id] || currentAccess),
                        group_chat: e.target.checked,
                      },
                    })
                  }
                />{" "}
                Allow Group Chat
              </label>
              <button onClick={() => updateEmployeeAccess(emp.id)} style={{ marginTop: "0.5rem" }}>
                Update Access
              </button>
            </div>
          </li>
        );
      })}
  </ul>
</div>

<div style={{ marginTop: "2rem", width: "500px", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
  <h3>Manage Employee Departments</h3>
  <ul style={{ listStyle: "none", padding: 0 }}>
    {employees
      // Optionally, filter out the current super admin if needed:
      .filter(emp => emp.id !== currentUserId)
      .map(emp => (
        <li key={emp.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>
          <div>
            <strong>{emp.name}</strong> (Current: {emp.department || "None"})
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
            <select
              value={deptUpdates[emp.id] || ""}
              onChange={(e) =>
                setDeptUpdates({ ...deptUpdates, [emp.id]: e.target.value })
              }
            >
              <option value="">-- Select Department --</option>
              {departmentList.map(dept => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            <button onClick={() => updateEmployeeDepartment(emp.id)}>Update</button>
          </div>
        </li>
      ))}
  </ul>
</div>

    <div style={{ marginTop: "2rem", width: "300px" }}>
      <h3>Assign Task</h3>
      <input
        type="text"
        placeholder="Task Title"
        value={taskForm.title}
        onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={taskForm.description}
        onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
      />
      {/* New: Department selection */}
      <select
        value={taskForm.department || ""}
        onChange={(e) => setTaskForm({ ...taskForm, department: e.target.value })}
      >
        <option value="">Select Department</option>
        {departmentList.map((dept) => (
          <option key={dept.id} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>
      <select
        value={taskForm.assigned_to}
        onChange={(e) => setTaskForm({ ...taskForm, assigned_to: e.target.value })}
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
          </option>
        ))}
      </select>
      <button onClick={addTask}>Assign Task</button>
    </div>
      {/* Task List */}
      <h3 style={{ marginTop: "1rem" }}>Tasks</h3>
      {tasks.length === 0 ? (
        <p style={{ color: "gray", textAlign: "center" }}>No tasks assigned to any employee yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: "0.5rem" }}>
              <strong>{task.title}</strong> - {task.employee_name} ({task.status})
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.3rem" }}>
                <button onClick={() => updateTaskStatus(task.id, "Completed")}>Mark Completed</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}


      {/* Attendance Management */}
      <h3 style={{ marginTop: "2rem" }}>Attendance Management</h3>
      <button onClick={fetchAttendance}>Refresh Attendance</button>
<ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
  {attendance.length === 0 ? (
    <li style={{ color: "gray", textAlign: "center" }}>No attendance records yet</li>
  ) : (
    attendance.map((record) => (
      <li
        key={record.id}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "0.5rem",
        }}
      >
        <strong>{record.employee_name}</strong> - {record.status}
        <small>
          Check-in:{" "}
          {record.check_in ? new Date(record.check_in).toLocaleString() : "N/A"} | Check-out:{" "}
          {record.check_out ? new Date(record.check_out).toLocaleString() : "N/A"}
        </small>

        {/* Update / Delete */}
        {editingAttendance === record.id ? (
          <>
            <input
              type="datetime-local"
              value={editAttendanceForm.check_in}
              onChange={(e) =>
                setEditAttendanceForm({ ...editAttendanceForm, check_in: e.target.value })
              }
            />
            <input
              type="datetime-local"
              value={editAttendanceForm.check_out}
              onChange={(e) =>
                setEditAttendanceForm({ ...editAttendanceForm, check_out: e.target.value })
              }
            />
            <select
              value={editAttendanceForm.status}
              onChange={(e) =>
                setEditAttendanceForm({ ...editAttendanceForm, status: e.target.value })
              }
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => saveAttendance(record.id)}>Save</button>
              <button onClick={cancelAttendanceEdit}>Cancel</button>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.3rem" }}>
            <button onClick={() => startAttendanceEdit(record)}>Update</button>
            <button onClick={() => deleteAttendance(record.id)}>Delete</button>
          </div>
        )}
      </li>
    ))
  )}
</ul>
<button onClick={downloadAttendanceCsv}>Download Attendance CSV</button>

<h3 style={{ marginTop: "2rem" }}>Leave Requests</h3>
<ul style={{ listStyle: "none", padding: 0 }}>
  {leaveRequests.map((req) => (
    <li key={req.id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "0.5rem", borderRadius: "6px" }}>
      <strong>{req.employee_name}</strong> (
  {new Date(req.start_date).toLocaleDateString()} → {new Date(req.end_date).toLocaleDateString()}
)
      <p>Reason: {req.reason}</p>
      <p>Status: {req.status}</p>
      {req.status === "Pending" && (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => updateLeaveStatus(req.id, "Approved")}>Approve</button>
          <button onClick={() => updateLeaveStatus(req.id, "Rejected")}>Reject</button>
        </div>
      )}
    </li>
  ))}
</ul>

    {/* NEW: Chat Container */}
    <div style={{ border: "1px solid #ccc", padding: "1rem", width: "400px", boxSizing: "border-box", marginTop: "2rem" }}>
      {chatSelectedReceiver ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setChatSelectedReceiver(null)} style={{ fontSize: "0.8rem", padding: "0.3rem 0.5rem" }}>
              Back
            </button>
            <h3 style={{ margin: 0 }}>Conversation with {chatSelectedReceiver.name}</h3>
          </div>
          <PrivateChat
            receiverId={chatSelectedReceiver.id}
            receiverName={chatSelectedReceiver.name}
            onClose={() => setChatSelectedReceiver(null)}
          />
        </>
      ) : (
        <>
          <h3>Select an Employee to Chat With</h3>
          {chatEmployees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {chatEmployees
                .filter((emp) => emp.id !== currentUserId)
                .map((emp) => (
                  <li key={emp.id} style={{ marginBottom: "0.5rem" }}>
                    <button onClick={() => setChatSelectedReceiver(emp)}>
                      {emp.name}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </>
      )}
    </div>

    <div style={{ marginTop: "2rem", width: "400px" }}>
  {assignedDept ? (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Department Group Chat: {assignedDept}</h3>
        <button onClick={leaveDepartment} style={{ fontSize: "0.8rem", padding: "0.3rem 0.5rem" }}>
          Leave Department
        </button>
      </div>
      <DeptGroupChat department={assignedDept} />
    </div>
  ) : (
    <DepartmentSelection />
  )}
</div>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
        Logout
      </button>
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
    </div>
  );
}
