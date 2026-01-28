import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Books = db.define("Books", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  publishedDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Books;
