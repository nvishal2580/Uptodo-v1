import firebase from "../../../firebase/firebase";
import { auth, db } from "./../../../firebase/firebase";

export const CreateNewProject = async (data) => {
  const userId = auth.currentUser.uid;
  const projectData = {
    ...data,
    adminId: userId,
    columnOrder: [],
    tasks: {},
    columns: {},
    members: [],
  };
  const docRef = await db.collection("projects").add(projectData);

  await db
    .collection("users")
    .doc(userId)
    .update({
      projects: firebase.firestore.FieldValue.arrayUnion({
        projectId: docRef.id,
        projectName: data.name,
      }),
    });

  console.log("project created");
};

export const FetchProjectsFromFirebase = async () => {
  let projectData;
  let projectDataList = [];
  const userId = auth.currentUser.uid;
  const userRef = firebase.database().ref("users/" + userId + "/project");
  userRef.on("value", (snapshot) => {
    console.log("project data for sidebar : ", snapshot.val());
    projectData = snapshot.val();
    for (const item in projectData) {
      projectDataList.push(projectData[item]);
    }
    console.log("data in list", projectDataList);
    return projectDataList;
  });
};

const joinExistProject = async (data) => {
  if (data.projectId == null) return;
};
