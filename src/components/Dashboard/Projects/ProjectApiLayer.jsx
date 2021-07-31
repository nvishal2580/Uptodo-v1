import {
  Typography,
  CircularProgress,
  Grid,
  IconButton,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase, { auth, db } from "../../../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Project from "./Project";
import styled from "styled-components";
import Spinner from "./../../Common/Spinner";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import ProjectUsers from "./ProjectUsers";

const useStyles = makeStyles({
  project_main: {
    fontFamily: "Roboto",
    flexDirection: "column",
    // maxWidth: "calc(100h - 250px)",
  },
  project_header: {
    display: "flex",
    borderBottom: "2px solid gray",
    borderBottomColor: "#f1f2f6",
    padding: "15px 0px 15px 20px",
    fontFamily: "Roboto",
    justifyContent: "space-between",
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
  const [usersModal, setUsersModal] = useState(false);
  const [userId, setUserId] = useState("");

  const FetchDataFromFirebase = async (projectId) => {
    setLoading(true);
    console.log("fatching data form firestore ");
    const currentUserId = auth.currentUser.uid;
    setUserId(currentUserId);
    console.log("userDI", userId);
    const projectRef = await db.collection("projects").doc(projectId);
    const unsub = await projectRef.onSnapshot((docSnapshot) => {
      const projectData = docSnapshot.data();
      console.log("data changed", projectData);
      if (projectData == null) console.log("project data is null");
      setAllData(projectData);
      setProjectName(projectData.name);
      setProjectDetails(projectData.details);
    });
    console.log("projcetAdmin", allData.adminId);
    console.log(allData);
    setLoading(false);
    return unsub;
  };

  useEffect(async () => {
    const unsub = await FetchDataFromFirebase(projectId);
    // console.log(unsub);
    return () => unsub();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Container>
          <div className={classes.project_header}>
            <div className={classes.project_title}>{projectName}</div>
            {
              <ProjectUsers
                open={usersModal}
                handleClose={setUsersModal}
                isAdmin={userId === allData.adminId ? true : false}
                projectId={projectId}
                members={allData.memberData}
                projectName={projectName}
              />
            }
            <div className={classes.project_func}>
              <IconButton onClick={() => setUsersModal(true)}>
                <GroupOutlinedIcon />
              </IconButton>
              <IconButton>
                <ChatBubbleOutlineOutlinedIcon />
              </IconButton>
            </div>
          </div>
          <div className={classes.project_content}>
            <Project data={allData} projectId={projectId} loading={isLoading} />
          </div>
        </Container>
      )}
    </>
  );
}

export default ProjectApiLayer;
