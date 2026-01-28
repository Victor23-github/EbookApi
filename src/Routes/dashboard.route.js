import express from "express";
import {
  getDashboardStats,
  getBooksSummary,
  getAuthorsSummary,
  getUsersSummary,
  getQuickOverview,
} from "../controllers/dashboard.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Dashboard routes
router.get("/", getDashboardStats); // Full dashboard with all stats
router.get("/quick", getQuickOverview); // Lightweight overview
router.get("/books", getBooksSummary); // Books summary
router.get("/authors", getAuthorsSummary); // Authors summary
router.get("/users", getUsersSummary); // Users summary

export default router;
