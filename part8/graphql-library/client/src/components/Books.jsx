import TableStyles from "./styles/TableStyles";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../utils/queries";
import { useState } from "react";

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState("");

  if (result.loading) {
    return <div>loading...</div>;
  }

  // const books = result.data.allBooks;
  const allBooks = result.data.allBooks;

  const books = selectedGenre
    ? allBooks.filter((book) => book.genres.includes(selectedGenre))
    : allBooks;

  const genres = Array.from(new Set(allBooks.flatMap((book) => book.genres)));

  return (
    <div>
      <TableStyles />
      <h2>Books</h2>
      <div>
        <label>Select Genre: </label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
              <td>{book.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
