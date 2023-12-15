const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const jwt = require('jsonwebtoken')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require("./schema/schema")
const { resolvers } = require("./resolvers/resolvers")
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to mongodb in progress...')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', 'MongoDB connection established.')
  })
  .catch((error) => {
    console.log(`'\x1b[31m%s\x1b[0m', Failed to connect to MongoDB: ${error.message}`)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      console.log("Current user:", currentUser)
      return { currentUser }
    } else {
      console.log("not authenticated")
    }
  },
}).then(({ url }) => {
  console.log(`\x1b[35mServer ready at\x1b[0m ${url} 🚀`);
})