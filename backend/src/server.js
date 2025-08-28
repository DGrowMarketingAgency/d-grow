import express from "express";
import dotenv from "dotenv";
<<<<<<< HEAD
import bcrypt from "bcryptjs"; // for seeding default user
=======
<<<<<<< HEAD
import bcrypt from "bcryptjs"; // for seeding default user
=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import http from "http";
import {Server} from "socket.io";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { createUserTable } from "./models/UserModel.js";
import taskRoutes from "./routes/taskRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import accessRoutes from "./routes/accessRoutes.js";
import privateMsgsRoutes from "./routes/privateMsgsRoutes.js";
import employeesRoutes from "./routes/employeesRoutes.js";
import departmentsRoutes from "./routes/departmentsRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import projectRoutes from "./routes/projectRoutes.js";
import groupChatRoutes from "./routes/groupChatRoutes.js";
import path from 'path';
import pool from './config/db.js';
import cron from 'node-cron'; // scheduled job runner
<<<<<<< HEAD
=======
=======
import groupChatRoutes from "./routes/groupChatRoutes.js";
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

dotenv.config();
const app = express();
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
// Serve uploaded files statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// Ensure private_messages table columns for attachments allow nulls
pool.query(`
  ALTER TABLE private_messages
    ALTER COLUMN attachment_data DROP NOT NULL,
    ALTER COLUMN attachment_mimetype DROP NOT NULL;
`).catch(err => console.error('Error dropping NOT NULL on attachment columns:', err));
// Remove legacy file_path column if exists
pool.query(
  `ALTER TABLE private_messages DROP COLUMN IF EXISTS file_path;`
).catch(err => console.error('Error dropping legacy file_path column:', err));

// Create users table and seed default SuperAdmin user
(async () => {
  try {
    await createUserTable();
    const defaultEmail = 'superadmin@gmail.com';
    const exists = await pool.query(
      'SELECT 1 FROM users WHERE email = $1',
      [defaultEmail]
    );
    if (exists.rows.length === 0) {
      const hashed = await bcrypt.hash('Hello123', 10);
      await pool.query(
        `INSERT INTO users (name, email, password, role)
         VALUES ($1, $2, $3, $4)`,
        ['Super Admin', defaultEmail, hashed, 'Super Admin']
      );
      console.log('Default SuperAdmin user seeded');
    }
    // Seed default Employee if none exist
    const empResult = await pool.query(
      `SELECT 1 FROM users WHERE role = $1`,
      ['Employee']
    );
    if (empResult.rows.length === 0) {
      const empHashed = await bcrypt.hash('Test123!', 10);
      await pool.query(
        `INSERT INTO users (name, email, password, role)
         VALUES ($1, $2, $3, $4)`,
        ['Employee1', 'employee1@gmail.com', empHashed, 'Employee']
      );
      console.log('Default Employee user seeded');
    }
  } catch (err) {
    console.error('Error creating user table or seeding SuperAdmin user:', err);
  }
})();
// Ensure tasks table has is_urgent column
pool.query(
  `ALTER TABLE tasks ADD COLUMN IF NOT EXISTS is_urgent BOOLEAN DEFAULT FALSE;`
).catch(err => console.error('Error adding is_urgent column to tasks:', err));

// Ensure projects table exists with required columns
pool.query(
  `CREATE TABLE IF NOT EXISTS projects (
     id SERIAL PRIMARY KEY,
     project_name VARCHAR(255),
     description TEXT,
     assigned_to INTEGER REFERENCES users(id),
     created_by INTEGER REFERENCES users(id),
     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );`
).catch(err => console.error('Error creating projects table:', err));
// Ensure departments table exists
pool.query(
  `CREATE TABLE IF NOT EXISTS departments (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) UNIQUE NOT NULL
  );`
).catch(err => console.error('Error creating departments table:', err));
// Seed default departments if none exist
pool.query('SELECT COUNT(*) FROM departments')
  .then(res => {
    if (parseInt(res.rows[0].count, 10) === 0) {
      const defaultDepartments = ['HR', 'Finance', 'Engineering', 'Sales'];
      defaultDepartments.forEach(name => {
        pool.query('INSERT INTO departments (name) VALUES ($1)', [name])
          .catch(err => console.error(`Error seeding department ${name}:`, err));
      });
    }
  })
  .catch(err => console.error('Error checking departments count:', err));
// Ensure payments table exists
pool.query(
  `CREATE TABLE IF NOT EXISTS payments (
     id SERIAL PRIMARY KEY,
     label VARCHAR(255) NOT NULL,
     payment_date DATE NOT NULL,
     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );`
).catch(err => console.error('Error creating payments table:', err));
// Add payment amount and status columns if missing
pool.query(
  `ALTER TABLE payments ADD COLUMN IF NOT EXISTS amount NUMERIC;`
).catch(err => console.error('Error adding amount column to payments:', err));
pool.query(
  `ALTER TABLE payments ADD COLUMN IF NOT EXISTS is_paid BOOLEAN DEFAULT FALSE;`
).catch(err => console.error('Error adding is_paid column to payments:', err));
// Ensure project_name and description columns exist
pool.query(
  `ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_name VARCHAR(255);`
).catch(err => console.error('Error adding project_name column to projects:', err));
pool.query(
  `ALTER TABLE projects ADD COLUMN IF NOT EXISTS description TEXT;`
).catch(err => console.error('Error adding description column to projects:', err));
// Ensure status column exists in projects table
pool.query(
  `ALTER TABLE projects ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Pending';`
).catch(err => console.error('Error adding status column to projects:', err));

app.use("/api/auth", authRoutes);
app.use("/attendance",attendanceRoutes);
// Admin and Super Admin routes
app.use("/api/admin", adminRoutes);
// Mount tasks routes under /api/tasks for consistency with frontend axios baseURL
app.use("/api/tasks", taskRoutes);
<<<<<<< HEAD
=======
=======

createUserTable();

app.use("/api/auth", authRoutes);
app.use("/attendance",attendanceRoutes);
app.use("/admin",adminRoutes);
app.use("/tasks", taskRoutes);
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
app.use("/leaves",leaveRoutes);
app.use("/api/notifications",notificationsRoutes);
app.use("/api/private-msgs",privateMsgsRoutes);
app.use("/api/employees",employeesRoutes);
app.use("/api/group-chat", groupChatRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/reports", reportsRoutes);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
app.use("/api/projects", projectRoutes);
// Mount payments routes
import paymentsRoutes from './routes/paymentsRoutes.js';
app.use('/api/payments', paymentsRoutes);
<<<<<<< HEAD
=======
=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7

// Create HTTP server and Socket.io instance
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }
});

// Maintain a mapping of online users: userId => socket.id
global.onlineUsers = new Map();
global.io = io; // make socket.io instance globally available for emission

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  
  socket.on("register", (userId) => {
    global.onlineUsers.set(userId, socket.id);
    console.log("User registered with socket:", userId);
  });

  // Allow client to join a department room
  socket.on("join_department", (department) => {
    socket.join(department);
    console.log(`Socket ${socket.id} joined department ${department}`);
  });

  socket.on("disconnect", () => {
    // Remove disconnected socket from online users mapping
    for (const [userId, sockId] of global.onlineUsers.entries()) {
      if (sockId === socket.id) {
        global.onlineUsers.delete(userId);
        break;
      }
    }
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
// Schedule daily reminders at 8 AM to notify SuperAdmins of upcoming payments (tomorrow)
cron.schedule('0 8 * * *', async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().slice(0,10);
    // fetch payments due tomorrow
    const remRes = await pool.query(
      'SELECT * FROM payments WHERE payment_date = $1', [dateStr]
    );
    if (remRes.rows.length > 0) {
      const admins = await pool.query(
        "SELECT id FROM users WHERE role = 'Admin' OR role = 'Super Admin'"
      );
      for (const pay of remRes.rows) {
        const msg = `Payment due tomorrow: ${pay.label} on ${pay.payment_date}`;
        for (const admin of admins.rows) {
          // notifications insertion
          await pool.query(
            `INSERT INTO notifications (user_id, message) VALUES ($1, $2)`,
            [admin.id, msg]
          );
          const sockId = global.onlineUsers.get(admin.id);
          if (sockId) global.io.to(sockId).emit('new_notification', { id: null, message: msg, created_at: new Date(), is_read: false });
        }
      }
    }
    // On payment date, create report tasks for admins
    const today = new Date().toISOString().slice(0,10);
    const payRes = await pool.query(
      'SELECT * FROM payments WHERE payment_date = $1 AND is_paid = FALSE', [today]
    );
    if (payRes.rows.length > 0) {
      const admins = await pool.query(
        "SELECT id FROM users WHERE role = 'Admin' OR role = 'Super Admin'"
      );
      for (const pay of payRes.rows) {
        for (const admin of admins.rows) {
          // create a task for payment report
          const taskTitle = `Payment Report: ${pay.label}`;
          const taskDesc = `Generate and review report for payment ${pay.label} due on ${pay.payment_date}`;
          await pool.query(
            `INSERT INTO tasks (title, description, assigned_to, department, is_urgent) VALUES ($1, $2, $3, $4, $5)`,
            [taskTitle, taskDesc, admin.id, 'Finance', false]
          );
          // send notification for the new task
          const notMsg = `New report task assigned: ${taskTitle}`;
          await pool.query(
            `INSERT INTO notifications (user_id, message) VALUES ($1, $2)`,
            [admin.id, notMsg]
          );
          const sockId2 = global.onlineUsers.get(admin.id);
          if (sockId2) global.io.to(sockId2).emit('new_notification', { id: null, message: notMsg, created_at: new Date(), is_read: false });
        }
      }
    }
  } catch (err) {
    console.error('Error scheduling payment reminders:', err);
  }
});
<<<<<<< HEAD
=======
=======
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
