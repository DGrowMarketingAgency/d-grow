import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrivateChat from "../../components/PrivateChat";
import DeptGroupChat from "../../components/DeptGroupChat";
import {io} from "socket.io-client";
import DepartmentSelection from "../../components/DepartmentSelection";

axios.defaults.baseURL = "http://localhost:5000";

export default function EmployeeDashboard() {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("id"), 10);
  const assignedDept = localStorage.getItem("department");
  const storedAccess = localStorage.getItem("access_rights");
  const userAccess = storedAccess ? JSON.parse(storedAccess) : { private_chat: true, leave_request: true, group_chat: true };


  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | checkedIn | checkedOut
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
<<<<<<< HEAD
  const [projects, setProjects] = useState([]);
=======
<<<<<<< HEAD
  const [projects, setProjects] = useState([]);
=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  // ✅ Leave request states
  const [leaveForm, setLeaveForm] = useState({
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [leaveMessage, setLeaveMessage] = useState("");

   // New state: employee list for private messaging
  const [employees, setEmployees] = useState([]);
  // This state holds the id of the employee selected for chatting
  const [selectedReceiver, setSelectedReceiver] = useState(null);

    const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/employees", authHeaders);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error.response?.data?.message || error.message);
    }
  };

  // Call fetchEmployees on component mount so we have a dynamic list
  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ Fetch today's attendance status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const res = await axios.get(
          `/attendance/monthly?month=${month}&year=${year}`,
          authHeaders
        );

        if (!Array.isArray(res.data)) return;

        const todayRecord = res.data.find((att) => {
          if (!att.check_in) return false; // ignore empty records
          const checkInDate = new Date(att.check_in).toDateString();
          return checkInDate === today.toDateString();
        });

        if (!todayRecord) {
          setStatus("idle"); // Not checked in
        } else if (todayRecord.check_in && !todayRecord.check_out) {
          setStatus("checkedIn"); // Checked in but not out
        } else if (todayRecord.check_in && todayRecord.check_out) {
          setStatus("checkedOut"); // Finished day
        }
      } catch (err) {
        console.log("Error fetching status:", err.response?.data?.message);
        setStatus("idle");
      }
    };

    fetchStatus();
  }, []);

  const checkIn = async () => {
    try {
      const res = await axios.post("/attendance/checkin", {}, authHeaders);
      setMessage(res.data.message);
      setStatus("checkedIn");
    } catch (err) {
      setMessage(err.response?.data?.message || "Check-in failed");
    }
  };

  const checkOut = async () => {
    try {
      const res = await axios.post("/attendance/checkout", {}, authHeaders);
      setMessage(res.data.message);
      setStatus("checkedOut");
    } catch (err) {
      setMessage(err.response?.data?.message || "Check-out failed");
    }
  };

const handleLogout = async () => {
  localStorage.clear(); // clear all data
  navigate("/login");   // redirect
};

  // ✅ Submit leave request
  const submitLeaveRequest = async () => {
    if (!leaveForm.start_date || !leaveForm.end_date || !leaveForm.reason) {
      setLeaveMessage("All fields are required");
      return;
    }
    try {
      const res = await axios.post("/leaves/request", leaveForm, authHeaders);
      setLeaveMessage(res.data.message || "Leave request submitted!");
      setLeaveForm({ start_date: "", end_date: "", reason: "" });
    } catch (err) {
      setLeaveMessage(err.response?.data?.message || "Failed to submit leave request");
    }
  };

  // ✅ Fetch personal leave requests
  const fetchMyLeaves = async () => {
    try {
      const res = await axios.get("/leaves/my", authHeaders);
      setLeaveRequests(res.data);
    } catch (err) {
      console.log("Failed to fetch leave requests:", err.response?.data?.message);
    }
  };

  const fetchMyTasks = async () => {
    try {
      const res = await axios.get("/tasks/my", authHeaders);
      setTasks(res.data);
    } catch (err) {
      console.log("Failed to fetch tasks:", err.response?.data?.message);
    }
  };

   const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/notifications", authHeaders);
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error.response?.data?.message);
    }
  };

    // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`, {}, authHeaders);
      setMessage("Notification marked as read.");
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error.response?.data?.message);
    }
  };

  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`, authHeaders);
      setMessage("Notification deleted.");
      fetchNotifications();
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting notification:", error.response?.data?.message);
    }
  };

  const handleMarkAsCompleted = async (taskId) => {
    try {
      await axios.put(`/tasks/employee/${taskId}`, { status: "Completed" }, authHeaders);
      fetchMyTasks(); // ✅ Refresh tasks after completion
    } catch (err) {
      console.log("Error updating task status:", err.response?.data?.message || err.message);
    }
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


  // ✅ Fetch data on mount
  useEffect(() => {
    fetchMyLeaves();
  }, [leaveMessage]);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    // Register the current user id with the socket server
    socket.emit("register", currentUserId);
    // Listen for new notifications
    socket.on("new_notification", (data) => {
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
    });
    return () => {
      socket.disconnect();
    };
  }, [currentUserId]);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
  const fetchMyProjects = async () => {
    try {
      const res = await axios.get('/api/projects/my', authHeaders);
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching my projects:', err.response?.data?.message || err.message);
    }
  };

  const handleProjectComplete = async (projectId) => {
    try {
      await axios.put(`/api/projects/${projectId}/status`, { status: 'Completed' }, authHeaders);
      fetchMyProjects();
    } catch (err) {
      console.error('Error updating project status:', err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  return (
    <div className="dashboard-container full-screen">
<<<<<<< HEAD
=======
=======
  return (
    <div
      className="center-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "1rem",
        overflowY: "auto",
      }}
    >
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      <h1>Employee Dashboard</h1>
      <h2>Hello, {name}</h2>

      {/* Notifications Panel */}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      <div className="dashboard-card">
        <h3 className="panel-header">Notifications</h3>
        {notifications.length === 0 ? (
          <p>No notifications.</p>
        ) : (
          <ul className="list">
            {notifications.map((notif) => (
              <li key={notif.id} className="list-item">
<<<<<<< HEAD
=======
=======
      <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", width: "300px" }}>
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
                  // If notification indicates a new chat message, open that conversation.
                  if (notif.message.includes("sent you a new message")) {
                    // Extract sender name from message. Assumes format: "John Doe sent you a new message."
                    const senderName = notif.message.split(" sent you a new message")[0];
                    // Try to find that employee from the list (skip if not found)
                    const emp = employees.find((e) => e.name === senderName);
                    if (emp) {
                      setSelectedReceiver(emp);
                    }
                  }
                }}
              >
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
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

      {/* ✅ Attendance buttons */}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      <div className="button-group">
        <button className="action-button" onClick={checkIn} disabled={status !== "idle"}>
          Check-In
        </button>
        <button className="action-button" onClick={checkOut} disabled={status !== "checkedIn"}>
          Check-Out
        </button>
        <button className="action-button" onClick={() => navigate("/employee-dashboard")}>Dashboard</button>
        <button className="action-button" onClick={handleLogout}>Logout</button>
<<<<<<< HEAD
=======
=======
      <div className="button-group" style={{ display: "flex", gap: "1rem" }}>
        <button onClick={checkIn} disabled={status !== "idle"}>
          Check-In
        </button>
        <button onClick={checkOut} disabled={status !== "checkedIn"}>
          Check-Out
        </button>
        <button onClick={() => navigate("/employee-dashboard")}>Dashboard</button>
        <button onClick={handleLogout}>Logout</button>
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      </div>

      {message && <p>{message}</p>}

      {/* Leave Request Form */}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      <div className="dashboard-card">
        <h3 className="panel-header">Request Leave</h3>
        {userAccess.leave_request ? (
          <>
            <input
              type="date"
              value={leaveForm.start_date}
              onChange={(e) => setLeaveForm({ ...leaveForm, start_date: e.target.value })}
            />
            <input
              type="date"
              value={leaveForm.end_date}
              onChange={(e) => setLeaveForm({ ...leaveForm, end_date: e.target.value })}
              style={{ marginTop: "0.5rem" }}
            />
            <textarea
              placeholder="Reason"
              value={leaveForm.reason}
              onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
              style={{ marginTop: "0.5rem" }}
            />
            <button onClick={submitLeaveRequest} style={{ marginTop: "0.5rem" }}>
              Submit Request
            </button>
          </>
        ) : (
          <p style={{ color: "grey" }}>
            Leave request feature is restricted. Please contact your administrator.
          </p>
        )}
        {leaveMessage && <p style={{ color: "green" }}>{leaveMessage}</p>}
      </div>
<<<<<<< HEAD
=======
=======
<div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", width: "300px" }}>
  <h3>Request Leave</h3>
  {userAccess.leave_request ? (
    <>
      <input
        type="date"
        value={leaveForm.start_date}
        onChange={(e) => setLeaveForm({ ...leaveForm, start_date: e.target.value })}
      />
      <input
        type="date"
        value={leaveForm.end_date}
        onChange={(e) => setLeaveForm({ ...leaveForm, end_date: e.target.value })}
        style={{ marginTop: "0.5rem" }}
      />
      <textarea
        placeholder="Reason"
        value={leaveForm.reason}
        onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
        style={{ marginTop: "0.5rem" }}
      />
      <button onClick={submitLeaveRequest} style={{ marginTop: "0.5rem" }}>
        Submit Request
      </button>
    </>
  ) : (
    <p style={{ color: "grey" }}>
      Leave request feature is restricted. Please contact your administrator.
    </p>
  )}
  {leaveMessage && <p style={{ color: "green" }}>{leaveMessage}</p>}
</div>
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

      {/* ✅ My Leave Requests */}
      <div
        style={{
          marginTop: "2rem",
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h3>My Leave Requests</h3>
        {leaveRequests.length === 0 ? (
          <p>No leave requests yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {leaveRequests.map((leave) => (
              <li
                key={leave.id}
                style={{
                  marginBottom: "0.5rem",
                  border: "1px solid #eee",
                  padding: "0.5rem",
                  borderRadius: "6px",
                }}
              >
                <strong>
                  {new Date(leave.start_date).toLocaleDateString()} →{" "}
                  {new Date(leave.end_date).toLocaleDateString()}
                </strong>
                <p>Reason: {leave.reason}</p>
                <p>Status: <b>{leave.status}</b></p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Assigned Tasks */}
      <div
        style={{
          marginBottom: "0.5rem",
          border: "1px solid #eee",
          padding: "0.5rem",
          borderRadius: "6px",
        }}
      >
        <h3>My Tasks</h3>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                marginBottom: "0.5rem",
                border: "1px solid #eee",
                padding: "0.5rem",
                borderRadius: "6px",
              }}
            >
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
              <p>
                <strong>Title:</strong> {task.title}
                {task.is_urgent && (
                  <span style={{ marginLeft: '8px', color: 'white', backgroundColor: 'red', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                    URGENT
                  </span>
                )}
              </p>
<<<<<<< HEAD
=======
=======
              <p><strong>Title:</strong> {task.title}</p>
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>

              {task.status !== "Completed" && (
                <button
                  onClick={() => handleMarkAsCompleted(task.id)}
                  style={{
                    marginTop: "0.5rem",
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No tasks assigned.</p>
        )}
      </div>

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
      {/* ✅ My Projects */}
      <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '300px' }}>
        <h3>My Projects</h3>
        {projects.length === 0 ? (
          <p>No projects assigned yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {projects.map(proj => (
              <li key={proj.id} style={{ marginBottom: '0.5rem' }}>
                <strong>{proj.name}</strong>
                <p>{proj.description}</p>
                <small>Created by: {proj.created_by_name}</small>
                <div>Status: {proj.status}</div>
                {proj.status !== 'Completed' && (
                  <button onClick={() => handleProjectComplete(proj.id)} style={{ marginTop: '0.5rem' }}>
                    Mark Completed
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

<<<<<<< HEAD
=======
=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
{/* Private Chat Container */}
<div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem", width: "400px", boxSizing: "border-box" }}>
  {userAccess.private_chat ? (
    <>
      {selectedReceiver ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setSelectedReceiver(null)} style={{ fontSize: "0.8rem", padding: "0.3rem 0.5rem" }}>
              Back
            </button>
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
          {employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {employees.filter(emp => emp.id !== currentUserId).map((emp) => (
                <li key={emp.id} style={{ marginBottom: "0.5rem" }}>
                  <button onClick={() => setSelectedReceiver(emp)}>
                    {emp.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  ) : (
    <p style={{ color: "grey" }}>
      Private chat feature is restricted. Please contact your administrator.
    </p>
  )}
</div>

<div style={{ marginTop: "2rem", width: "400px" }}>
  {userAccess.group_chat ? (
    assignedDept ? (
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
    )
  ) : (
    <p style={{ color: "grey" }}>
      Group chat feature is restricted. Please contact your administrator.
    </p>
  )}
</div>

    </div>
  );
}
