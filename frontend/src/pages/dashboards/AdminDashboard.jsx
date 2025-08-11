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
}