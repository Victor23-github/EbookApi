import UserModel from "../model/users.model.js";

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.findAll({
      attributes: ["id", "firstName", "lastName", "email"],
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    return res.status(500).json({ message: "Failed to get Users" });
  }
}

async function getUser(req, res) {}
async function addUser(req, res) {}
async function updateUser(req, res) {}
async function deleteUser(req, res) {}

export { getAllUsers, getUser, addUser, updateUser, deleteUser };
