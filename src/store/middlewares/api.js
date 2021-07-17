import firebase from "../../firebase/firebase";
import * as actions from "../api";
import { initializeTasks, setLoading } from "../inboxTasks";
import { updateList } from "../project";

const api =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== actions.apiCallBegin.type) return next(action);

    const { userId, type } = action.payload;
    let inboxTasks = [];

    console.log("api call begin");
    dispatch(setLoading());
    try {
      const userDataRef = firebase
        .database()
        .ref(type + "/" + userId + "/list");
      userDataRef.once("value", (snapshot) => {
        let data = snapshot.val();

        console.log("dataa", data);

        for (let id in data) {
          inboxTasks.push({ ...data[id], id: id });
        }
        dispatch(initializeTasks(inboxTasks));
        // getting data of projects
        let projectData;
        let projectDataList = [];
        const projectRef = firebase
          .database()
          .ref("users/" + userId + "/project");
        projectRef.once("value", (snapshot) => {
          console.log("project data for sidebar : ", snapshot.val());
          projectData = snapshot.val();
          for (const item in projectData) {
            projectDataList.push(projectData[item]);
          }
          console.log("data at api stage : ", projectDataList);
          dispatch(updateList(projectDataList));
        });

        dispatch(setLoading());
      });
      console.log(inboxTasks);

      inboxTasks = [];
    } catch (error) {
      console.log("error form midddlware");
    }
  };

export default api;
