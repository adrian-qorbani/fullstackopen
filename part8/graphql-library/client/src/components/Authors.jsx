import TableStyles from "./styles/TableStyles";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../utils/queries";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);
  console.log("result authors:", result)
  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;
  return (
    <div>
      <TableStyles />
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Book Count</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
