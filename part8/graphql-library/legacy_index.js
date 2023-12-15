// Legacy version uses startStandaloneServer but lacks substantial features available in expressMiddleware
// Doesn't support subscriptions
 
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const jwt = require('jsonwebtoken')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require("./schema/schema")
const { resolvers } = require("./resolvers/resolvers")
const { User } = require("./schema/bookSchema");
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
console.log("USER:", User)
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
  console.log(`Server ready at ${url} 🚀`)
})