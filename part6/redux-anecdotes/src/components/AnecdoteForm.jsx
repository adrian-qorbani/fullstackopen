import { useSelector, useDispatch } from "react-redux";
// import { addAnecdotes } from "../reducers/anecdoteReducer";

import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    // dispatch(addAnecdotes(content));
    dispatch(createAnecdote(content));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">CREATE</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
