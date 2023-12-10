const mongoose = require('mongoose');

// Define the Mongoose schema for Book
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  published: {
    type: Number,
    required: true
  },
  author: {
    type: String
    // I might want to reference the Author model here if each book has a unique author
  },
  genres: {
    type: [String]
  }
});

// Define the Mongoose schema for Author
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  born: {
    type: Number
  }
});

// Define Mongoose models
const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);

// Define methods for mutations
const addBook = async ({ title, author, published, genres }) => {
  const book = new Book({ title, author, published, genres });
  return await book.save();
}

const addAuthor = async ({ name, born }) => {
  const author = new Author({ name, born });
  return await author.save();
}

const editAuthor = async ({ name, setBornTo }) => {
  return await Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true });
}

// Export the models and mutation methods
module.exports = {
  Book,
  Author,
  addBook,
  addAuthor,
  editAuthor
};