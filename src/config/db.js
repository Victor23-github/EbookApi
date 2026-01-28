import { Sequelize } from "sequelize";

// Use environment variables when available; otherwise fall back to defaults.
const DB_NAME = process.env.DB_NAME ?? "ebook_db";
const DB_USER = process.env.DB_USER ?? "root";
const DB_PASS = process.env.DB_PASS ?? "password";
const DB_HOST = process.env.DB_HOST ?? "127.0.0.1";
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

// Create & export a Sequelize instance for MySQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "Sequelize connected to MySQL:",
      `${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

export default sequelize;
