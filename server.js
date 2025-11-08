require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// ⬅️ Conexión a MongoDB
connectDB();

// ✅ CORS corregido para producción + Vercel
const allowedOrigins = [
  "https://frontend-gestorde-tareas.vercel.app",                                // dominio principal ✅
  "https://frontend-gestorde-tareas-paxukd9yl-kloster96s-projects.vercel.app",  // deployment actual ✅
  "http://localhost:5173"                                                       // desarrollo local ✅
];


app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // postman o scripts sin origin
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Middleware
app.use(express.json());

// ✅ Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// ✅ Servir archivos subidos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
