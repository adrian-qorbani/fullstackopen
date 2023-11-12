import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

// const reducer = (state = initialState, action) => {
//   console.log("state now: ", state);
//   console.log("action", action);

//   if (action.type == "INCREMENT") {
//     const id = action.payload.id;
//     const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
//     const changedAnecdote = {
//       ...anecdoteToChange,
//       votes: anecdoteToChange.votes + 1,
//     };
//     return state.map((anecdote) =>
//       anecdote.id !== id ? anecdote : changedAnecdote
//     );
//   } else if (action.type == "NEW_NOTE") {
//     return state.concat(action.payload);
//   }
//   return state;
// };

// export const vote = (id) => {
//   console.log("vote", id);
//   return {
//     type: "INCREMENT",
//     payload: { id },
//   };
// };

// export const addAnecdotes = (content) => {
//   console.log("anecdote: ", content);
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       votes: 0,
//       id: getId()
//     }
//   }
// };

// using Redux's createSlice
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,

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
  },
});

// export default reducer;

export const { createAnecdote, voteForAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
