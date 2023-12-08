const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require("./schema/schema")
const resolvers = require("./resolvers/resolvers")

/*
   It might make more sense to associate a book with its author by storing 
   the author's id in the context of the book instead of the author's name
   However, for simplicity, we will store the author's name in connection 
   with the book
*/

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})