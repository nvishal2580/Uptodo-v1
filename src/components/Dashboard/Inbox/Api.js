import firebase, { db, auth } from "../../../firebase/firebase";

const fetchDataFromFirebase = () => {
  const userId = auth.currentUser.uid;

  db.collection("inbox").doc(userId);
};
