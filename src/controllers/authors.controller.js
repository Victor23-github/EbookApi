import AuthorModel from "../model/author.model.js";

// Get all authors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorModel.findAll();
    if (authors.length === 0) {
      return res.status(404).json({ message: "No authors found" });
    }
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get author by ID
export const getAuthorById = async (req, res) => {
  try {
    const author = await AuthorModel.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new author
export const createAuthor = async (req, res) => {
  try {
    const newAuthor = await AuthorModel.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update author
export const updateAuthor = async (req, res) => {
  try {
    const author = await AuthorModel.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const updatedAuthor = await author.update(req.body);
    return res.status(200).json(updatedAuthor);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete author
export const deleteAuthor = async (req, res) => {
  try {
    const deleted = await AuthorModel.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Author not found" });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
