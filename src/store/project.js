import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "Projects",
  initialState: {
    List: [],
  },
  reducers: {
    updateList: (state, action) => {
      console.log("form reducer", action.payload);
      state.List = action.payload;
    },
    addProject: (state, action) => {
      state.List.push(action.payload);
    },
  },
});

export const { updateList, addProject } = projectSlice.actions;

export default projectSlice.reducer;
