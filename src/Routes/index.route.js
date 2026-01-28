import express from "express";

import authorsRoutes from "./authors.route.js";
import usersRoutes from "./users.route.js";
import dashboardRoutes from "./dashboard.route.js";
import booksRoutes from "./books.route.js";
import authRoutes from "./auth.route.js";
import blogRoutes from "./blog.route.js";

// middleware
import { authorize } from "../middleware/auth.middleware.js";

const mainApp = express.Router();

mainApp.use("/auth", authRoutes);
mainApp.use("/users", usersRoutes);
mainApp.use("/dashboard", dashboardRoutes);
mainApp.use("/authors", authorize, authorsRoutes);
mainApp.use("/books", booksRoutes);
mainApp.use("/blogs", blogRoutes);

export default mainApp;
