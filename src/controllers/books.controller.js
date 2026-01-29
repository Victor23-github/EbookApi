import bookModel from "../model/books.model.js";

const getBooks = async (req, res) => {
  try {
    const books = await bookModel.findAll();
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json(books);
  } catch (err) {
    console.error("getBooks error:", err);
    return res.status(500).json({ message: "Failed to load books" });
  }
};
// Get book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await bookModel.findByPk(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ message: `Book with id ${req.params.id} not found` });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  const { title, publishedDate, description } = req.body;
  try {
    const newBook = await bookModel.create({
      title,
      publishedDate,
      description,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Failed to create book: " + error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, publishedDate, description } = req.body;
  try {
    const book = await bookModel.findByPk(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = title ?? book.title;
    book.publishedDate = publishedDate ?? book.publishedDate;
    book.description = description ?? book.description;

    await book.save();
    return res.json(book);
  } catch (err) {
    console.error("updateBook error:", err);
    return res.status(500).json({ message: "Could not update book" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await bookModel.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    return res.json({ message: "Book deleted" });
  } catch (err) {
    console.error("deleteBook error:", err);
    return res.status(500).json({ message: "Could not delete book" });
  }
};

export { getBooks, addBook, updateBook, deleteBook };
