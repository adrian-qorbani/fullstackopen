import { useSelector, useDispatch } from "react-redux";
import { setNotif } from "../reducers/notificationReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";


import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    await anecdoteService.create(content);
    
    dispatch(createAnecdote(content));
    dispatch(setNotif(content))
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
