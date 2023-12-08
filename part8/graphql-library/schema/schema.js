// GraphQl Schema

const typeDefs = `
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]
  }

  type Book {
    title: String
    published: Int
    author: String
    genres: [String]
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String]!
    ): Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
  }
`

module.exports = typeDefs;