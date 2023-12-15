import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author
    genres
    author
    published
    title
  }
`

export const ME = gql`
  query Me {
    me {
      favoriteGenre
      id
      username
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      genres
      author
      published
      title
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $genres: [String]!) {
    addBook(title: $title, published: $published, genres: $genres) {
      title
      published
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`