import { BrowserRouter as Route, Link } from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => {
  // const Anecdote = ({ anecdotes }) => {
  //   <div>
  //     <h2>Anecdotes</h2>
  //     <ul>
  //       {anecdotes.map((anecdote) => (
  //         // <li key={anecdote.id}>{anecdote.content}</li>
  //         <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
  //       ))}
  //     </ul>
  //   </div>;
  // };
  return (
    // <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
    <div>
      <h2>Anecdotes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {anecdotes.map((anecdote) => (
              <TableRow key={anecdote.id}>
                <TableCell>
                  <Link to={`/anecdotes/${anecdote.id}`}>
                    {anecdote.content}
                  </Link>{" "}
                </TableCell>
                <TableCell>{anecdote.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default AnecdoteList;
