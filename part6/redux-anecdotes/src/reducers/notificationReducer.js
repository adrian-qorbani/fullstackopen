import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      console.log("Hello world!");
      return action.payload;
    },
  },
});


export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
