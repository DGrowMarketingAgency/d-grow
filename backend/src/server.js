import express from "express";
import dotenv from "dotenv";
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
import groupChatRoutes from "./routes/groupChatRoutes.js";

dotenv.config();
const app = express();
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

createUserTable();

app.use("/api/auth", authRoutes);
app.use("/attendance",attendanceRoutes);
app.use("/admin",adminRoutes);
app.use("/tasks", taskRoutes);
app.use("/leaves",leaveRoutes);
app.use("/api/notifications",notificationsRoutes);
app.use("/api/private-msgs",privateMsgsRoutes);
app.use("/api/employees",employeesRoutes);
app.use("/api/group-chat", groupChatRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/reports", reportsRoutes);

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
