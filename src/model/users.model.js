import { DataTypes } from "sequelize";
import db from "../config/db.js";

// Define the User model
const User = db.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const userRole = db.define("userRole", {
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.hasOne(userRole);
export default User;
