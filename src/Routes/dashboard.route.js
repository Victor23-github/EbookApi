import express from "express";
import {
  getDashboardStats,
  getBooksSummary,
  getAuthorsSummary,
  getUsersSummary,
  getQuickOverview,
} from "../controllers/dashboard.controller.js";
import { permission } from "../middleware/permission.js";
import { authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Dashboard routes
router.get("/", authorize, getDashboardStats); // Full dashboard with all stats
router.get("/quick", authorize, permission(["user"]), getQuickOverview); // Lightweight overview
router.get("/books", getBooksSummary); // Books summary
router.get("/authors", getAuthorsSummary); // Authors summary
router.get("/users", getUsersSummary); // Users summary

export default router;
