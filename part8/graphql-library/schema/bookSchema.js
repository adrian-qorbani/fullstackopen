const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

// Define the Mongoose schema for Book
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  published: {
    type: Number,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: {
    type: [String]
  }
});

bookSchema.plugin(uniqueValidator)

// Define the Mongoose schema for Author
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number
  }
});
authorSchema.plugin(uniqueValidator)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    minlength: 3
  }
})

userSchema.plugin(uniqueValidator)



// Define Mongoose models
const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);
const User = mongoose.model('User', userSchema);


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

const addUser = async ({ username, favoriteGenre }) => {
  const user = new User({ username, favoriteGenre });
  return await user.save();
}

// Export the models and mutation methods
module.exports = {
  Book,
  Author,
  addBook,
  addAuthor,
  editAuthor,
  addUser,
  User
};