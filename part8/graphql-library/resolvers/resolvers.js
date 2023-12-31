const jwt = require('jsonwebtoken')
const { Book, Author, addBook, addAuthor, editAuthor, addUser, User } = require("../schema/bookSchema");
const { GraphQLError } = require('graphql');
const { PubSub } = require('graphql-subscriptions')

require('dotenv').config()

const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: async (root, args, { currentUser }) => {
      if (currentUser) {
        return currentUser
      } else {
        throw new GraphQLError("No logged user detected.")
      }
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return await Book.find(args);
    },
    allAuthors: async () => {
      return await Author.aggregate([
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
    // 
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      const newBook = await addBook(args);

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      try {
        await newBook.save()
        await currentUser.save()
      } catch (error) {
        // If an error occurs during the save operation, throw a GraphQL error
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook;

    }
    ,
    addAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("Not authenticated.")
      }
      try {
        const newAuthor = await addAuthor(args);
        return newAuthor;
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("Not Authenticated")
      }
      try {
        const updatedAuthor = await editAuthor(args);
        return updatedAuthor;
      } catch (error) {
        // If an error occurs during the update operation, throw a GraphQL error
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            invalidArgs: args.name,
            error
          }
        })
      }
    }, createUser: async (root, args) => {
      // try {
      const newUser = await addUser(args);
      return newUser;

    },
    login: async (root, args) => {

      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== process.env.JWT_SECRET) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }

    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers 