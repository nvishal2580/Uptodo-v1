import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Grid, Paper } from "@material-ui/core";
import { auth } from "./../../firebase/firebase";
import { useHistory, useRouteMatch } from "react-router-dom";
import SideBar from "./SideBar";
import PrimarySearchAppBar from "./NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Link } from "react-router-dom";
import Inbox from "./TasksFiles/Inbox";
import Daily from "./TasksFiles/Daily";
import Upcoming from "./TasksFiles/Upcoming";
import store from "../../store/store";
import { apiCallBegin } from "../../store/api";
import Project from "./Projects/Project";
import ProjectApiLayer from "./Projects/ProjectApiLayer";

const useStyles = makeStyles({
  main_div: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  sidebar: {
    boxSizing: "border-box",
    paddingTop: "25px",
    paddingLeft: "10px",
    position: "fixed",
    left: 0,
    overflowX: "hidden",
    overflowY: "hidden",
    transition: "left .25s ",
    width: "250px",
    backgroundColor: "#FAFAFA",
    height: "calc(100vh - 48px)",
  },
  main_content: {
    marginLeft: "250px",
    transition: "margin-left .25s cubic-bezier(.4,0,.2,1)",
    maxHeight: "calc(100vh - 48px)",
    // maxWidth: "calc(100vh - 250px)",
  },
  main_content_resize: {
    marginLeft: "0px",
  },
  sidebar_helper: {
    display: "none",
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 198,
    backgroundColor: "rgba(0,0,0,.5)",
    transition: "opacity .25s cubic-bezier(.4,0,.2,1)",
    opacity: 0,
    visibility: "hidden",
  },
  siderbar_view: {
    opacity: 1,
    visibility: "visible",
  },
  sidebar_hidden: {
    visibility: "hidden",
    opacity: 0,
  },
  sidebar_move_left: {
    left: "-250px",
  },
  sidebar_resizer: {
    boxSizing: "border-box",
    width: "3px",
    position: "fixed",
    overflowX: "hidden",
    overflowY: "hidden",
    zIndex: 50,
    left: "250px",
    // border: "2px solid red",
    // height: "900px",
  },
  sidebar_resizer_hide: {
    display: "none",
  },
});

const Dashboard = ({ match }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  let { path } = useRouteMatch();
  const classes = useStyles();
  const history = useHistory();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    store.dispatch(apiCallBegin({ userId, type: "/inbox" }));
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className={classes.main_div}>
      <div>
        <PrimarySearchAppBar setShowSidebar={toggleSidebar} />
      </div>
      <div>
        <div
          className={`${classes.sidebar_helper} ${
            showSidebar === true
              ? classes.siderbar_view
              : classes.sidebar_hidden
          }`}
        ></div>
        <div
          className={`${classes.sidebar} ${
            showSidebar === false ? classes.sidebar_move_left : ""
          }`}
        >
          <SideBar showSidebar={showSidebar} />
        </div>
        <div
          className={`${classes.sidebar_resizer} ${
            showSidebar === false ? classes.sidebar_resizer_hide : ""
          }`}
        ></div>

        <div
          className={`${classes.main_content} ${
            showSidebar === false ? classes.main_content_resize : ""
          }`}
        >
          <Switch>
            <Route path={`${path}inbox`}>
              <Inbox />
            </Route>
            <Route path={`${path}upcoming`}>{/* <Project /> */}</Route>
            <Route path={`${path}daily`}>
              <Daily />
            </Route>
            <Route
              path={`${path}project/:projectId`}
              render={(props) => (
                <ProjectApiLayer
                  key={props.match.params.projectId}
                  projectId={props.match.params.projectId}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
