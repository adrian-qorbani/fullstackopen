import { useSelector, useDispatch } from "react-redux";
// import { addAnecdotes } from "../reducers/anecdoteReducer";

import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  hideNotification,
} from "../reducers/notificationReducer";

import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  // const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(setNotification(`added new anecdote: ${content}.`));

    await anecdoteService.create(content);

    dispatch(createAnecdote(content));
    // dispatch(createAnecdote(createdAnecdote));

    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
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
