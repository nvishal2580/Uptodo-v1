import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth";
import inboxReducer from "./inboxTasks";
import projectReducer from "./project";
import api from "./middlewares/api";

export default configureStore({
  reducer: {
    currentUser: authReducer,
    inbox: inboxReducer,
    project: projectReducer,
  },
  middleware: [...getDefaultMiddleware(), api],
});
