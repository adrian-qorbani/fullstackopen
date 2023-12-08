const { v1: uuid } = require('uuid')

// Resolvers
const books = require('../library/books.json');
const authors = require('../library/authors.json');

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = [...books]
      // filter based on author given
      if (args.author) {
        filteredBooks = filteredBooks.filter(book => book.author === args.author);
      }
      // filter based on genre given [exercise 8.5]
      if (args.genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre));
      }

      return filteredBooks;
    },
    allAuthors: () => {
      const authorBookCounts = authors.map(author => {
        const bookCount = books.filter(book => book.author === author.name).length;
        return {
          name: author.name,
          bookCount
        };
      });
      return authorBookCounts;
    }
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    genres: (root) => root.genres,
    // id: (root) => root.id
  },
  Mutation: {
    addBook: (root, args) => {
      const { title, author: newAuthor, published, genres } = args;

      // check if author exist upon adding a book with an author
      const existingAuthor = authors.find(author => author.name === newAuthor);
      if (!existingAuthor) {
        const newAuthorId = uuid();
        const authorData = {
          id: newAuthorId,
          name: newAuthor,
          born: null,
          bookCount: 1
        };
        // update authors
        authors.push(authorData);

        authorId = newAuthorId;
      } else {
        authorId = existingAuthor.id;
        existingAuthor.bookCount++;
      }
      const newBook = { ...args, id: uuid() };
      // update books
      books.push(newBook);

      // I should consider writing existent changes to JSONs....(work in progress)

      return newBook;
    },
    addAuthor: (root, args) => {
      const { name, born } = args;
      const existingAuthor = authors.find(author => author.name === name);

      if (!existingAuthor) {
        const newAuthorId = uuid();
        const authorData = {
          id: newAuthorId,
          name,
          born,
          bookCount: 0
        };

        authors.push(authorData);

        return authorData;
      }

      // If the author already exists, throw error (work in progress)

      return null;
    },
    editAuthor: (root, args) => {
      const { name, setBornTo } = args;
      const updatedAuthor = authors.find(author => author.name === name);
      if (updatedAuthor) {
        updatedAuthor.born = setBornTo
        return updatedAuthor
      }
      return null;
    }
  }
};

module.exports = resolvers;