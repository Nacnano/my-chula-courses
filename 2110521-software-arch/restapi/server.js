const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/shrines", require("./routes/shrines"));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Shrine Collection Platform API",
    version: "1.0.0",
    endpoints: {
      shrines: "/api/shrines",
      statistics: "/api/shrines/stats",
    },
    documentation: {
      "GET /api/shrines":
        "Get all shrines (supports pagination, filtering, sorting)",
      "GET /api/shrines/:id": "Get a specific shrine",
      "POST /api/shrines": "Create a new shrine",
      "PUT /api/shrines/:id": "Update a shrine",
      "DELETE /api/shrines/:id": "Delete a shrine",
      "GET /api/shrines/stats": "Get shrine statistics",
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
