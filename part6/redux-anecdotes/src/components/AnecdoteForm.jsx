const AnecdoteForm = ({ addAnecdote }) => {
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
