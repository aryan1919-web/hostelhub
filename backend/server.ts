import express from "express";
import cors from "cors";
import { initializeDatabase } from "./db/setup.js";
import authRoutes from "./routes/auth.js";
import complaintRoutes from "./routes/complaints.js";
import leaveRoutes from "./routes/leaves.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// Initialize database
initializeDatabase();

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "healthy",
    service: "HostelHub API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/leaves", leaveRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Server error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`\n🚀 HostelHub API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Auth:   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   Docs:   GET  http://localhost:${PORT}/api/complaints\n`);
});

export default app;
