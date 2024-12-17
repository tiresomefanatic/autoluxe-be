// src/index.ts
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import carRoutes from "./routes/car.routes";
import userRoutes from "./routes/user.routes";
import brandRoutes from "./routes/brand.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Basic route
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      message: "Something went wrong!",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
);

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
