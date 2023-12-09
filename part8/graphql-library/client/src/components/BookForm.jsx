import { useState } from "react";
import FormStyles from "./styles/FormStyles";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../utils/queries";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(1990);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
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
    </div>
  );
};

export default BookForm;
