import Books from "../model/books.model.js";
import Author from "../model/author.model.js";
import User from "../model/users.model.js";

// Get overall dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Count total records
    const totalBooks = await Books.count();
    const totalAuthors = await Author.count();
    const totalUsers = await User.count();

    // Get recent books (last 5)
    const recentBooks = await Books.findAll({
      order: [["publishedDate", "DESC"]],
      limit: 5,
      attributes: ["id", "title", "publishedDate", "description"],
    });

    // Get all authors with count
    const authorsData = await Author.findAll({
      attributes: ["id", "name", "bio"],
    });

    // Get user registration trend (count users by creation date)
    const userGrowth = await User.findAll({
      attributes: [
        [
          User.sequelize.fn("DATE", User.sequelize.col("createdAt")),
          "registrationDate",
        ],
        [User.sequelize.fn("COUNT", User.sequelize.col("id")), "count"],
      ],
      group: [User.sequelize.literal("DATE(createdAt)")],
      order: [[User.sequelize.literal("DATE(createdAt)"), "DESC"]],
      subQuery: false,
      raw: true,
    });

    res.status(200).json({
      success: true,
      timestamp: new Date(),
      summary: {
        totalBooks,
        totalAuthors,
        totalUsers,
      },
      recentBooks,
      authorsData,
      userGrowth,
    });
  } catch (error) {
    console.error("getDashboardStats error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch dashboard stats" });
  }
};

// Get books summary
export const getBooksSummary = async (req, res) => {
  try {
    const totalBooks = await Books.count();
    const books = await Books.findAll({
      attributes: ["id", "title", "publishedDate", "description"],
      order: [["publishedDate", "DESC"]],
    });

    res.status(200).json({
      success: true,
      totalBooks,
      books,
    });
  } catch (error) {
    console.error("getBooksSummary error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch books summary" });
  }
};

// Get authors summary
export const getAuthorsSummary = async (req, res) => {
  try {
    const totalAuthors = await Author.count();
    const authors = await Author.findAll({
      attributes: ["id", "name", "bio"],
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      success: true,
      totalAuthors,
      authors,
    });
  } catch (error) {
    console.error("getAuthorsSummary error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch authors summary" });
  }
};

// Get users summary
export const getUsersSummary = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      totalUsers,
      users,
    });
  } catch (error) {
    console.error("getUsersSummary error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch users summary" });
  }
};

// Get quick overview (minimal data for lightweight dashboard)
export const getQuickOverview = async (req, res) => {
  try {
    const totalBooks = await Books.count();
    const totalAuthors = await Author.count();
    const totalUsers = await User.count();

    const latestBook = await Books.findOne({
      order: [["publishedDate", "DESC"]],
      attributes: ["id", "title", "publishedDate"],
    });

    const latestUser = await User.findOne({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "firstName", "lastName", "email"],
    });

    res.status(200).json({
      success: true,
      overview: {
        totalBooks,
        totalAuthors,
        totalUsers,
        latestBook,
        latestUser,
      },
    });
  } catch (error) {
    console.error("getQuickOverview error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch quick overview" });
  }
};
