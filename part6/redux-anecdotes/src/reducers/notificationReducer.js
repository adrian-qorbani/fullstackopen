import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      console.log("payload is", action.payload);
      return action.payload;
    },
    hideNotification(state, action) {
      console.log("action is" , action)
      return null
    }
  },
});

export const setNotif = (content) => {
  return async (dispatch) => {
    dispatch(setNotification(`added ${content}`))
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
  }
}

export const { setNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
