import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "currentUser",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeUser: (state, action) => {
      console.log("removee useer called");
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;

export const getUser = (state) => {
  if (state === undefined) return undefined;
  else return state.currentUser;
};
