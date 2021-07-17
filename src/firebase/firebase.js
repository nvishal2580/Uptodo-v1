import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAYNQAE7oLWQM8ykgMoyT0ewC5n-BclgOM",
  authDomain: "todo-fd778.firebaseapp.com",
  projectId: "todo-fd778",
  storageBucket: "todo-fd778.appspot.com",
  messagingSenderId: "486117501506",
  appId: "1:486117501506:web:a7c2f323de9b319f6b9bdb",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
