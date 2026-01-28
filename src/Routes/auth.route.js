import e from "express";

const router = e.Router();

import { createUser, userLogin } from "../controllers/auth.controller.js";

// Auth routes
router.post("/register", createUser);
router.post("/login", userLogin);

export default router;
