import { useState } from "react";
import FormStyles from "./styles/FormStyles";
import { useMutation } from "@apollo/client";
import {
  CREATE_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
  UPDATE_AUTHOR,
} from "../utils/queries";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(1990);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [changedAuthor, setChangedAuthor] = useState("");
  const [born, setBorn] = useState("");

  const [addBook] = useMutation(CREATE_BOOK, {
    // refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {      
      console.log(error.graphQLErrors[0].message)    
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
    },
  });

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleAddGenre = () => {
    if (genre) {
      setGenres((prevGenres) => [...prevGenres, genre]);
      setGenre("");
    }
  };

  const handleCreateBook = () => {
    const newBook = {
      title: title,
      author: author,
      published: parseInt(published),
      genres: genres,
    };
    console.log(newBook);
    addBook({ variables: { title, author, published, genres } });
  };

  const handleUpdateAuthor = () => {
    const updatedAuthor = {
      name: changedAuthor,
      setBornTo: parseInt(born),
    };
    console.log("updated author:", updatedAuthor);
    updateAuthor({ variables: { name: changedAuthor, setBornTo: parseInt(born) } });
  };

  return (
    <div>
      <h2>Create a New Book</h2>
      <FormStyles />
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="published">Published:</label>
          <input
            type="text"
            id="published"
            value={published}
            onChange={(e) => setPublished(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <button type="button" onClick={handleAddGenre}>
            Add Genre
          </button>
        </div>

        <div>
          {genres.map((g, index) => (
            <span key={index}>{g}, </span>
          ))}
        </div>
        <button type="button" onClick={handleCreateBook}>
          Create Book
        </button>
      </form>
      <form>
        <div>
          <label htmlFor="title">Author name:</label>
          <input
            type="text"
            id="author-name"
            value={changedAuthor}
            onChange={(e) => setChangedAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">born:</label>
          <input
            type="text"
            id="author-born"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleUpdateAuthor}>
          Update Author
        </button>
      </form>
    </div>
  );
};

export default BookForm;
