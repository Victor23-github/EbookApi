import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Author = db.define("Author", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
export default Author;
