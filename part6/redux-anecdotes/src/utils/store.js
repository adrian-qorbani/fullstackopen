import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'


// const anecdoteSlice = createSlice({
//   name: "anecdotes",
//   anecdotesAtStart,
//   reducers: {
//     addAnecdotes(state, action) {
//       const content = action.payload;
//       const newId = getId();
//       const votes = 0;
//       // no return?
//       console.log(state)
//       state.push({ content, newId, votes });
//     },
//     vote(state, action) {
//       const id = action.payload.id;
//       const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1,
//       };
//       console.log(state)
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : changedAnecdote
//       );
//     },
//   },
// });


// export const { addAnecdotes, vote } = anecdoteSlice.actions
// export default anecdoteSlice.reducer

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

export default store