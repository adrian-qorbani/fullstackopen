const { Book, Author, addBook, addAuthor, editAuthor } = require('../schema/bookSchema'); 

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};
      if (args.author) {
        query.author = args.author;
      }
      if (args.genre) {
        query.genres = args.genre;
      }
      return await Book.find(query);
    },
    allAuthors: () => {
      return Author.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "name",
            foreignField: "author",
            as: "books"
          }
        },
        {
          $project: {
            name: 1,
            born: 1,
            bookCount: { $size: "$books" }
          }
        }
      ]);
    }
  },
  Book: {
    // No need to define resolvers for simple field mappings, Mongoose mappings should work out of the box
  },
  Mutation: {
    addBook: async (root, args) => {
      return await addBook(args);
    },
    addAuthor: async (root, args) => {
      return await addAuthor(args);
    },
    editAuthor: async (root, args) => {
      return await editAuthor(args);
    }
  }
};

module.exports = resolvers;