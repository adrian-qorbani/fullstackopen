import { useSelector, useDispatch } from "react-redux";
// import { vote } from "../reducers/anecdoteReducer";
import anecdoteReducer, {
  createAnecdote,
  voteForAnecdote,
} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  // const anecdotes = useSelector((state) => state.anecdotes);
  const anecdotes = useSelector((state) => {
    if (state.filter == null) {
      return state.anecdotes;
    } else {
      const regex = new RegExp(state.filter, "i");
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.match(regex)
      );
    }
  });

  console.log("my anecdotes:", anecdotes[1].votes);

  const dispatch = useDispatch();

  // Voting action creator
  const addVote = (id) => {
    dispatch(voteForAnecdote(id));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes
        // .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
