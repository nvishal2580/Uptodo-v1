import firebase from "./firebase";
import store from "../store/store";
import * as actions from "../store/inboxTasks";
import { apiCallBegin } from "./../store/api";

export const apiAddTask = (type, data) => {
  const userId = localStorage.getItem("userId");
  try {
    const userDataRef = firebase.database().ref(type + "/" + userId + "/list");
    userDataRef.push(data, () => {
      console.log("data pushed");
      store.dispatch(actions.addTask(data));
      store.dispatch(apiCallBegin({ userId, type: "/inbox" }));
    });
  } catch (error) {
    console.log("error form api", error.message);
  }
};

export const apiToggleTask = (type, data) => {
  const userId = localStorage.getItem("userId");
  const path = type + "/" + userId + "/list";
  console.log("path -> ", path);
  console.log(data);
  try {
    const userDataRef = firebase.database().ref(path).child(data.id);
    userDataRef.get().then((snapshot) => {
      let temp = snapshot.val();
      temp = temp.isCompleted;
      userDataRef.update({ isCompleted: !temp });
    });
  } catch (error) {
    console.log("error form api", error.message);
  }
};

export const apiUpdateTask = (type, id, data) => {
  const userId = localStorage.getItem("userId");

  try {
    const userDataRef = firebase
      .database()
      .ref(type + "/" + userId + "/list")
      .child(id);

    userDataRef.update(data);
  } catch (error) {
    console.log("error form api", error.message);
  }
};

export const apiDeleteTask = (type, id) => {
  const userId = localStorage.getItem("userId");

  try {
    const userDataRef = firebase
      .database()
      .ref(type + "/" + userId + "/list")
      .child(id);
    userDataRef.remove();
  } catch (error) {
    console.log("error form api", error.message);
  }
};
