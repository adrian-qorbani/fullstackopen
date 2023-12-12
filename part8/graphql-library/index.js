const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', false)
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require("./schema/schema")
// const resolvers = require("./resolvers/resolvers")
const { Book, Author, addBook, addAuthor, editAuthor, addUser, User } = require("./schema/bookSchema");
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
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("Not authenticated.")
      }
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
      if (!user || args.password !== 'secret') {
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
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: async ({ req }) => {
  //   console.log("req:", req )

  //   const auth = req ? req.headers.authorization : null
  //   console.log("context:", auth )
  //   if (auth && auth.toLowerCase().startsWith('bearer ')) {
  //     const decodedToken = jwt.verify(
  //       auth.substring(7), process.env.JWT_SECRET
  //     )
  //     const currentUser = await User.findById(decodedToken.id)
  //     return { currentUser }
  //   }
  // }
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
  context: async ({ req, res }) => {


    const auth = req ? req.headers.authorization : null

    if (auth && auth.startsWith("Bearer ")) {

      console.log("CONNECTED!")
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      console.log("decoded:", decodedToken)

      const currentUser = await User

        .findById(decodedToken.id)

      console.log(currentUser)

      return { currentUser }

    } else {
      console.log("not authenticated")
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url} 🚀`)
})