import { User, Role, UserRole } from "../model/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function createUser(req, res) {
  const DEFAULT_ROLE = "user"; // Default role for new signup

  // get request body
  const { firstName, lastName, password, email } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;
  //check if user already exists
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //password length validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // assign default role
    let role = await Role.findOne({ where: { name: DEFAULT_ROLE } });

    // Create default role if it doesn't exist
    if (!role) {
      role = await Role.create({
        name: DEFAULT_ROLE,
        description: "Standard user role",
      });
    }

    // salt rounds and Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });

    // Associate user with role
    await newUser.addRole(role);

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function userLogin(req, res) {
  // get users details
  const { password, email } = req.body;
  try {
    // checking if user exists
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
      .json({
        success: true,
        message: "Login successful",
        accessToken: accessToken,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createUser, userLogin };
