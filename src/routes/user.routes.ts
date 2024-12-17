// src/routes/user.routes.ts
import { Router } from "express";
import {
  createOrUpdateUser,
  getCurrentUser,
  getUserById,
} from "../controllers/user.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = Router();

// Public route for creating/updating user after Firebase auth
router.post("/", createOrUpdateUser);

// Protected routes
router.get("/me", authenticateUser, getCurrentUser);
router.get("/:id", authenticateUser, getUserById);

export default router;
