import express from "express";
import {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  assignRoleToUser,
  removeRoleFromUser,
} from "../controllers/users.controller.js";

const router = express.Router();

// Define user-related routes here
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Role assignment routes
router.post("/assign-role", assignRoleToUser);
router.post("/remove-role", removeRoleFromUser);

export default router;
