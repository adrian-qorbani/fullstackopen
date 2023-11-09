const filterReducer = (state = null, action) => {
  // ...
    console.log("filtered state now: ", state);
    console.log("filtered action", action);
    if (action.type == "SET_FILTER") {
      return state = action.payload
    }
  return state
};

export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export default filterReducer;
