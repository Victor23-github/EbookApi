import { User } from "../model/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function createUser(req, res) {
  const DEFAULT_ROLE = "user"; // Default role for new signup

  const { firstName, lastName, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        roleId: newUser.role_id,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function userLogin(req, res) {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(email, process.env.JWT_SECRET);

    res
      .status(200)
      .json({ message: "Login successful", accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createUser, userLogin };
