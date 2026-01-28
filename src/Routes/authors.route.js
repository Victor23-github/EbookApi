import { Router } from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authors.controller.js";

const router = Router();

//  When mounted at /api, these will respond at /api/authors, /api/authors/:id, etc.
router.get("/", getAllAuthors);// get route for all hte authors in the database
router.get("/:id", getAuthorById); // search for a single author
router.post("/", createAuthor); // post route to add/create new authors 
router.put("/:id", updateAuthor); // edit an author
router.delete("/:id", deleteAuthor); // delete an author

export default router;
