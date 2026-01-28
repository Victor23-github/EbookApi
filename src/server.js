import app from "./app.js";
import sequelize from "./config/db.js";

//Database Sync and app Server startup
(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.error("Failed to start server:", err.message);
    console.log(err);
  }
})();
