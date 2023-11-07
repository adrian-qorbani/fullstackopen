import { useSelector, useDispatch } from "react-redux";
import { vote, addAnecdotes } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  // Voting action creator
  const addVote = (id) => {
    dispatch(vote(id));
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(addAnecdotes(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  );
};

export default App;
