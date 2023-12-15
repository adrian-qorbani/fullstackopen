const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

const jwt = require('jsonwebtoken')
// const { startStandaloneServer } = require('@apollo/server/standalone')

const typeDefs = require("./schema/schema")
const resolvers = require("./resolvers/resolvers")
// const { resolvers } = require("./resolvers/resolvers")

const { User } = require("./schema/bookSchema");

mongoose.set('strictQuery', false)
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to mongodb in progress...')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB.')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })
// console.log("USER:", User)
// startStandaloneServer(server, {
//   listen: { port: process.env.PORT },
//   context: async ({ req, res }) => {
//     const auth = req ? req.headers.authorization : null
//     if (auth && auth.startsWith("Bearer ")) {
//       const decodedToken = jwt.verify(
//         auth.substring(7), process.env.JWT_SECRET
//       )
//       const currentUser = await User
//         .findById(decodedToken.id)
//       console.log("Current user:", currentUser)
//       return { currentUser }
//     } else {
//       console.log("not authenticated")
//     }
//   },
// }).then(({ url }) => {
//   console.log(`Server ready at ${url} 🚀`)
// })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    }),
  )

  const PORT = process.env.PORT

  httpServer.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT} 🚀`)
  )
}

start()