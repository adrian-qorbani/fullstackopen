import { createSlice } from "@reduxjs/toolkit";

// const filterReducer = (state = null, action) => {
//   // ...
//     console.log("filtered state now: ", state);
//     console.log("filtered action", action);
//     if (action.type == "SET_FILTER") {
//       return state = action.payload
//     }
//   return state
// };

// export const filterChange = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };

const initialState = null;

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterChange(state, action) {
      return (state = action.payload);
    },
  },
});

// export default filterReducer;

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;

