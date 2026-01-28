import e from "express";

import {
  getBooks,
  deleteBook,
  updateBook,
  addBook,
  getBookById,
} from "../controllers/books.controller.js";

const router = e.Router();

//  When mounted at /api, these will respond at /api/books, /api/books/:id, etc.
router.get("/", getBooks); // get all the books in th Db
router.get("/:id", getBookById); //get a single book
router.post("/", addBook); //add a new book in the DB
router.put("/:id", updateBook); //edit the Title or Desc
router.delete("/:id", deleteBook); // delete a book

export default router;
