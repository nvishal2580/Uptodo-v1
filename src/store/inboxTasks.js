import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
  name: "Inbox",
  initialState: {
    isLoading: false,
    List: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.List = [action.payload, ...state.List];
    },
    deleteTask: (state, action) => {
      state.List = state.List.filter((item) => action.payload !== item.id);
    },
    toggleTask: (state, action) => {
      console.log(action.payload);
      let index = state.List.findIndex((item) => item.id === action.payload);
      let task = state.List[index];
      state.List = state.List.filter((item) => item.id !== action.payload);
      task.isCompleted = !task.isCompleted;
      state.List = [...state.List, task];
    },
    updateTask: (state, action) => {
      let index = state.List.findIndex((item) => item.id === action.payload.id);
      state.List[index] = action.payload;
    },
    initializeTasks: (state, action) => {
      state.List = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTask,
  updateTask,
  initializeTasks,
  setLoading,
} = inboxSlice.actions;
export default inboxSlice.reducer;

export const getCompletedTask = (state) => {
  if (state === undefined) return null;
  else return state.List.filter((item) => item.isCompleted === true);
};

export const getPendingTasks = (state) => {
  if (state === undefined) return null;
  else return state.List.filter((item) => item.isCompleted === false);
};
