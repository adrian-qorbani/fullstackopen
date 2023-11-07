const filterReducer = (state = "ALL", action) => {
  // ...
    console.log("filtered state now: ", state);
    console.log("filtered action", action);
  return state
};

export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export default filterReducer;
