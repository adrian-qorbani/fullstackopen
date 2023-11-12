import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);


// using Redux's createSlice
const anecdoteSlice = createSlice({
  name: "anecdotes",
  // initialState,
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      const id = getId();
      const votes = 0;
      state.push({
        content,
        id,
        votes,
      });
    },
    voteForAnecdote(state, action) {
      // should it be mutable?
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      // console.log(JSON.parse(JSON.stringify(state)))
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    appendAnecdote(state, action) {
      console.log("action payload is:", action.payload);
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

// export default reducer;

export const { createAnecdote, voteForAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
