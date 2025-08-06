import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrivateChat from "../../components/PrivateChat";
import DeptGroupChat from "../../components/DeptGroupChat";
import DepartmentSelection from "../../components/DepartmentSelection";
import { io } from "socket.io-client";

axios.defaults.baseURL = "http://localhost:5000";

export default function ClientDashboard() {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("id"), 10);
  const assignedDept = localStorage.getItem("department"); // if client is assigned a dept
  const [notifications, setNotifications] = useState([]);
  const [chatEmployees, setChatEmployees] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [deptTasks, setDeptTasks] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/notifications", authHeaders);
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error.response?.data?.message || error.message);
    }
  };

  const downloadStatusReport = async () => {
  try {
    const response = await axios.get(
      `/api/reports/status?department=${assignedDept}`,
      { headers: { Authorization: `Bearer ${token}` }, responseType: "blob" }
    );
    // Create a URL from the blob
    const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Status_Report_${assignedDept}_${new Date().toLocaleDateString()}.pdf`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessage("Report downloaded successfully.");
  } catch (error) {
    console.error("Error downloading report:", error.response?.data?.message || error.message);
    setMessage("Error downloading report.");
  }};

  // Fetch employees for private chat (if applicable for client)
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/employees", authHeaders);
      setChatEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchEmployees();

    // Setup real-time notifications
    const socket = io("http://localhost:5000");
    socket.emit("register", currentUserId);
    socket.on("new_notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });
    return () => socket.disconnect();
  }, [currentUserId]);

  // Mark notification as read
  const markAsRead = async (notifId) => {
    try {
      await axios.patch(`/api/notifications/${notifId}/read`, {}, authHeaders);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error.response?.data?.message);
    }
  };

  const fetchDeptTasks = async () => {
  if (!assignedDept) return;
  try {
    const res = await axios.get(`/tasks/department/${assignedDept}`, authHeaders);
    setDeptTasks(res.data);
  } catch (error) {
    console.error("Error fetching department tasks:", error.response?.data?.message || error.message);
  }
};

useEffect(() => {
  if (assignedDept) {
    fetchDeptTasks();
  }
}, [assignedDept]);

  // Delete notification
  const deleteNotification = async (notifId) => {
    try {
      await axios.delete(`/api/notifications/${notifId}`, authHeaders);
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error.response?.data?.message);
    }
  };

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
        padding: "1rem"
      }}
    >
      <h1>Client Dashboard</h1>
      <h2>Hello, {name}</h2>

      {/* Notifications Panel */}
      <div style={{ width: "300px", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Notifications</h3>
        {notifications.length === 0 ? (
          <p>No notifications.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {notifications.map((notif) => (
              <li
                key={notif.id}
                style={{ marginBottom: "0.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem", cursor: "pointer" }}
                onClick={() => {
                  if (notif.message.includes("sent you a new message")) {
                    const senderName = notif.message.split(" sent you a new message")[0];
                    const sender = chatEmployees.find((e) => e.name === senderName);
                    if (sender) {
                      setSelectedReceiver(sender);
                    }
                  }
                }}
              >
                <p>{notif.message}</p>
                <small>{new Date(notif.created_at).toLocaleString()}</small>
                <div style={{ marginTop: "0.5rem" }}>
                  {!notif.is_read && (
                    <button onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }} style={{ marginRight: "0.5rem" }}>
                      Mark as Read
                    </button>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "2rem", width: "400px", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h3>Department Tasks</h3>
        {deptTasks.length === 0 ? (
          <p>No tasks for your department yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {deptTasks.map((task) => (
              <li key={task.id} style={{ marginBottom: "0.5rem", borderBottom: "1px solid #eee", paddingBottom: "0.5rem" }}>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <p>
                  Assigned to: {task.employee_name} | Status: {task.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "2rem", width: "400px", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", textAlign: "center" }}>
      <h3>Status Reports</h3>
      <button onClick={downloadStatusReport} style={{ padding: "0.5rem 1rem" }}>
        Download Status Report (PDF)
      </button>
    </div>

      {/* Private Chat Section */}
      <div style={{ width: "400px", padding: "1rem", border: "1px solid #ccc", boxSizing: "border-box" }}>
        {selectedReceiver ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => setSelectedReceiver(null)}
                style={{ fontSize: "0.8rem", padding: "0.3rem 0.5rem" }}
              >
                Back
              </button>
              <h3 style={{ margin: 0 }}>Chat with {selectedReceiver.name}</h3>
            </div>
            <PrivateChat
              receiverId={selectedReceiver.id}
              receiverName={selectedReceiver.name}
              onClose={() => setSelectedReceiver(null)}
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
                  .filter(emp => emp.id !== currentUserId)
                  .map((emp) => (
                    <li key={emp.id} style={{ marginBottom: "0.5rem" }}>
                      <button onClick={() => setSelectedReceiver(emp)}>{emp.name}</button>
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* Group Chat Section */}
      <div style={{ width: "400px", padding: "1rem", border: "1px solid #ccc", boxSizing: "border-box" }}>
        {assignedDept ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3>Department Group Chat: {assignedDept}</h3>
              <button
                onClick={async () => {
                  try {
                    await axios.put(`/api/departments/${currentUserId}`, { department: null }, authHeaders);
                    localStorage.removeItem("department");
                    window.location.reload();
                  } catch (error) {
                    console.error("Error leaving department:", error.response?.data?.message || error.message);
                  }
                }}
                style={{ fontSize: "0.8rem", padding: "0.3rem 0.5rem" }}
              >
                Leave Department
              </button>
            </div>
            <DeptGroupChat department={assignedDept} />
          </div>
        ) : (
          <DepartmentSelection />
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}