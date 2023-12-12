const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require("./schema/schema")
// const resolvers = require("./resolvers/resolvers")
const { Book, Author, addBook, addAuthor, editAuthor } = require("./schema/bookSchema");
const { GraphQLError } = require('graphql');

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to mongodb in progress...')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

///////////////////////////
const resolvers = {
  Query: {
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
    addBook: async (root, args) => {
      try {
        const newBook = await addBook(args);
        return newBook;
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
    }
    ,
    addAuthor: async (root, args) => {
      // return await addAuthor(args);
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
    editAuthor: async (root, args) => {
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
    }
  }
};

///////////////////////////

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})