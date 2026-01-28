import express from "express";
import {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = express.Router();

// Define user-related routes here
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
