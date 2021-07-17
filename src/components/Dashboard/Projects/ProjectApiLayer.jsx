import { Typography, CircularProgress, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase, { auth, db } from "../../../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Project from "./Project";
import styled from "styled-components";

const useStyles = makeStyles({
  project_main: {
    fontFamily: "Roboto",
    flexDirection: "column",
    // maxWidth: "calc(100h - 250px)",
  },
  project_header: {
    borderBottom: "2px solid gray",
    borderBottomColor: "#f1f2f6",
    padding: "20px 0px 10px 0px",
  },
  project_title: {
    fontSize: "30px",
  },
  project_content: {
    // maxWidth: "calc(100h - 250px)",
    flex: 1,
    // overflowX: "scroll",
  },
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  /* max-width: calc(100vh - 250px);
  min-width: calc(100vh - 251px); */
`;
function ProjectApiLayer({ projectId }) {
  const classes = useStyles();
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [allData, setAllData] = useState({});

  const FetchDataFromFirebase = async (projectId) => {
    setLoading(true);
    console.log("fatching data form firestore ");
    const userId = auth.currentUser.uid;
    const projectRef = await db.collection("projects").doc(projectId);
    const unsub = await projectRef.onSnapshot((docSnapshot) => {
      const projectData = docSnapshot.data();
      console.log("data changed", projectData);
      setAllData(projectData);
      setProjectName(projectData.name);
      setProjectDetails(projectData.details);
    });
    console.log("unsub", unsub);
    setLoading(false);
    return unsub;
  };

  useEffect(async () => {
    const unsub = await FetchDataFromFirebase(projectId);
    // console.log(unsub);
    return () => unsub();
  }, []);

  console.log(projectId);
  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Container>
          <div className={classes.project_header}>
            <div className={classes.project_title}>{projectName}</div>
          </div>
          <div className={classes.project_content}>
            <Project data={allData} projectId={projectId} />
          </div>
        </Container>
      )}
    </>
  );
}

export default ProjectApiLayer;
