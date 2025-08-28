<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [chatSelectedReceiver, setChatSelectedReceiver] = useState(null);

  // Sample data for charts and table
  const userRolesData = {
    labels: ['Admins', 'Managers', 'Employees'],
    datasets: [
      {
        label: 'Count',
        data: [5, 12, 43],
        backgroundColor: ['#4ADE80', '#60A5FA', '#F472B6'],
      },
    ],
  };

  const deptOverview = [
    { name: 'HR', employees: 8, progress: 75 },
    { name: 'Engineering', employees: 25, progress: 50 },
    { name: 'Marketing', employees: 12, progress: 90 },
  ];

  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Activity',
        data: [120, 200, 150, 170, 180, 190, 210],
        borderColor: '#4ADE80',
        backgroundColor: 'rgba(74, 222, 128, 0.5)',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Weekly Activity' },
    },
  };

  const token = localStorage.getItem('token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  // Employee CRUD state
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });

  // Notifications state
  const [notifications, setNotifications] = useState([]);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/employees', authHeaders);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => { fetchEmployees(); }, []);

  // Edit handlers
  const startEdit = (emp) => {
    setEditingEmployee(emp.id);
    setEditForm({ name: emp.name, email: emp.email, role: emp.role });
  };
  const cancelEdit = () => { setEditingEmployee(null); };
  const saveEdit = async () => {
    try {
      await axios.put(`/employees/${editingEmployee}`, editForm, authHeaders);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) { console.error(err); }
  };

  const deleteEmp = async (id) => {
    try {
      await axios.delete(`/employees/${id}`, authHeaders);
      fetchEmployees();
    } catch (err) { console.error(err); }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/api/notifications', authHeaders);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`, {}, authHeaders);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`, authHeaders);
      fetchNotifications();
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  // Toggle for viewing full notification details
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const toggleNotificationDetails = (id) => {
    setSelectedNotificationId(selectedNotificationId === id ? null : id);
  };

  // When notifications tab active, load notifications
  useEffect(() => {
    if (activeTab === 'notifications') {
      fetchNotifications();
    }
  }, [activeTab]);

  // Also fetch all notifications on initial load
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className={`flex h-screen font-poppins bg-gradient-to-r from-indigo-100 to-indigo-600 ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className="w-20 flex flex-col items-center py-6 space-y-6 backdrop-blur-md bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-30 border border-white border-opacity-20 rounded-xl mx-2">
        <button className="p-2 hover:animate-pulse text-white" onClick={() => setActiveTab('notifications')}><FiBell size={24} /></button>
        <button className="p-2 hover:animate-pulse text-white" onClick={() => setActiveTab('users')}><FiUser size={24} /></button>
        <button className="p-2 hover:animate-pulse text-white" onClick={() => setActiveTab('analytics')}><FiBarChart2 size={24} /></button>
        <button className="mt-auto p-2 hover:animate-pulse text-white" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
      </aside>

      {/* Main Content with tab switching */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-30 border-b border-white border-opacity-20">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'notifications' ? 'Notifications' : activeTab === 'users' ? 'Users' : 'Analytics'}</h1>
        </header>
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* User Roles Chart */}
              <section className="bg-blue-100 bg-opacity-50 backdrop-blur-md rounded-xl p-4 shadow-neu animate-fadeInUp">
                <h2 className="text-lg font-semibold mb-4">User Roles</h2>
                <Bar data={userRolesData} />
              </section>

              {/* Department Overview */}
              <section className="bg-blue-100 bg-opacity-50 backdrop-blur-md rounded-xl p-4 shadow-neu animate-fadeInUp">
                <h2 className="text-lg font-semibold mb-4">Departments</h2>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr><th>Name</th><th>Employees</th><th>Progress</th></tr>
                    </thead>
                    <tbody>
                      {deptOverview.map((d) => (
                        <tr key={d.name}>
                          <td>{d.name}</td>
                          <td>{d.employees}</td>
                          <td>{d.progress}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                {/* End Department Overview */}
              </main>
            )}

          {activeTab === 'notifications' && (
            <section className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-neu p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-300 pb-2">
                Notifications
              </h2>
              {notifications.length === 0 ? (
                <p className="text-center text-white">No notifications.</p>
               ) : (
                 <ul className="space-y-4">
                   {notifications.map((noti) => {
                     const sender = employees.find(e => e.id === noti.user_id) || { name: 'User' };
                     return (
                       <li key={noti.id} className="bg-gray-700 bg-opacity-70 p-4 rounded-lg">
                         <div className="flex justify-between items-center">
                          <span className="text-white font-medium cursor-pointer"
                             onClick={() => toggleNotificationDetails(noti.id)}
                           >
                             {noti.message}
                         </span>
                         <div className="flex space-x-2">
                           {!noti.read && (
                             <button onClick={() => markAsRead(noti.id)} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition">
                               Mark as read
                             </button>
                           )}
                           <button onClick={() => deleteNotification(noti.id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition">
                             Delete
                           </button>
                           <button onClick={() => setChatSelectedReceiver({ id: noti.user_id, name: sender.name })} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition">
                             View Chat
                           </button>
                         </div>
                       </div>
                       {selectedNotificationId === noti.id && (
                          <div className="mt-2 p-4 bg-white bg-opacity-40 dark:bg-gray-700 dark:bg-opacity-40 rounded text-sm text-white space-y-1">
                             <p><strong>ID:</strong> {noti.id}</p>
                             <p><strong>Message:</strong> {noti.message}</p>
                             <p><strong>Status:</strong> {noti.read ? 'Read' : 'Unread'}</p>
                             <p><strong>Date:</strong> {new Date(noti.created_at).toLocaleString()}</p>
                           </div>
                         )}
                       </li>
                     );
                   })}
                 </ul>
               )}
             </section>
          )}

          {activeTab === 'users' && (
            <section className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-neu p-6 text-gray-900 dark:text-gray-100">
               <h2 className="text-xl font-semibold mb-4">Employee Management</h2>
               <ul className="space-y-4">
                 {employees.map(emp => (
<li key={emp.id} className="bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-50 p-4 rounded text-gray-900 dark:text-gray-100">
  {editingEmployee === emp.id ? (
    <div className="space-y-2">
      <input className="w-full p-1" type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
      <input className="w-full p-1" type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
      <select className="w-full p-1" value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })}>
        <option>Employee</option><option>Admin</option><option>Client</option>
      </select>
      <div className="flex space-x-2">
        <button onClick={saveEdit} className="px-3 py-1 bg-green-500 rounded">Save</button>
        <button onClick={cancelEdit} className="px-3 py-1 bg-gray-500 rounded">Cancel</button>
      </div>
    </div>
  ) : (
    <div className="flex justify-between items-center">
      <div>{emp.name} ({emp.email}) - {emp.role}</div>
      <div className="space-x-2">
        <button onClick={() => startEdit(emp)} className="px-2 py-1 bg-blue-500 rounded">Edit</button>
        <button onClick={() => deleteEmp(emp.id)} className="px-2 py-1 bg-red-500 rounded">Delete</button>
      </div>
    </div>
  )}
</li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'analytics' && (
            <section className="space-y-6">
              <Bar data={userRolesData} />
              <Line data={activityData} options={lineOptions} />
            </section>
          )}

          {chatSelectedReceiver && (
            <section className="mt-6 p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-neu">
              <button onClick={() => setChatSelectedReceiver(null)} className="mb-4 text-sm text-gray-600 hover:underline">← Back to Notifications</button>
              <PrivateChat receiverId={chatSelectedReceiver.id} receiverName={chatSelectedReceiver.name} onClose={() => setChatSelectedReceiver(null)} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeptGroupChat from "../../components/DeptGroupChat";
import DepartmentSelection from "../../components/DepartmentSelection";
import PrivateChat from "../../components/PrivateChat";
import { io } from "socket.io-client";

axios.defaults.baseURL = "http://localhost:5000";

export default function AdminDashboard() {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("id"), 10);
  const assignedDept = localStorage.getItem("department");
  const [departmentList, setDepartmentList] = useState([]);
  const navigate = useNavigate();
  
  // State for editing employees (only employees view)
  const [employees, setEmployees] = useState([]);
  
  // State for chat employees (all employees from /api/employees)
  const [chatEmployees, setChatEmployees] = useState([]);
  
  // Chat related state
  const [chatNotifications, setChatNotifications] = useState([]);
  const [chatSelectedReceiver, setChatSelectedReceiver] = useState(null);

  // Other states for tasks, attendance, leaveRequests, etc.
  const [attendance, setAttendance] = useState([]);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [editAttendanceForm, setEditAttendanceForm] = useState({
    check_in: "",
    check_out: "",
    status: "Present",
  });

  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const res = await axios.get("/admin/employees", authHeaders);
      setEmployees(res.data);
    } catch (err) {
      console.error(err.response?.data?.message);
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

  // ✅ Add Employee
  const addEmployee = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!form.name || !form.email || !form.password) {
      setMessage("All fields are required");
      return;
    }
    if (!emailRegex.test(form.email)) {
      setMessage("Invalid email format");
      return;
    }
    if (!passwordRegex.test(form.password)) {
      setMessage(
        "Password must be 8+ chars with uppercase, lowercase, number, and special char"
      );
      return;
    }

    try {
      const res = await axios.post("/admin/employees", form, authHeaders);
      setMessage(res.data.message);
      setForm({ name: "", email: "", password: "" });
      fetchEmployees();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add employee");
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

  // ✅ Delete Employee
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

  // ✅ Save Edited Employee
  const saveEdit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!editForm.name || !editForm.email || !editForm.role) {
      setMessage("All fields except password are required");
      return;
    }
    if (!emailRegex.test(editForm.email)) {
      setMessage("Invalid email format");
      return;
    }
    if (editForm.password && !passwordRegex.test(editForm.password)) {
      setMessage(
        "Password must be 8+ chars with uppercase, lowercase, number, and special char"
      );
      return;
    }

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
      <h1>Admin Dashboard</h1>
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

      {/* Add Employee Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h3>Add Employee</h3>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>

      {/* Employee List */}
      <h3>Employee List</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {employees.map((emp) => (
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
    </div>
  );
}
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
