import { BrowserRouter as Route, Link } from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => {
  const Anecdote = ({ anecdotes }) => {
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          // <li key={anecdote.id}>{anecdote.content}</li>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        ))}
      </ul>
    </div>;
  };
  return (
    <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
  );
};
export default AnecdoteList;
