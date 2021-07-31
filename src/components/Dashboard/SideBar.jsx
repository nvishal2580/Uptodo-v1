import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { Slide, Paper } from "@material-ui/core";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlined from "@material-ui/icons/AddCircleOutlined";
import AddProjectDialog from "./Projects/AddProject";
import { useStore } from "react-redux";
import { auth, db } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sidebar_root: {},
  link: {
    textDecoration: "none",
  },
}));

const ProjectTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AddProject = styled.div`
  display: flex;
  padding: 8px 16px;
  :hover {
    color: red;
    cursor: pointer;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;

export default function NestedList({ showSidebar }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const { path } = useRouteMatch();
  const [addProjectDilog, setAddProjectDialog] = useState(false);
  const store = useStore();
  const [dataList, setDataList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = getProjectList();
    // return () => unsubscribe();
  }, []);

  const getProjectList = async () => {
    setLoading(true);
    const userId = auth.currentUser.uid;
    const userRef = await db.collection("users").doc(userId);
    const unsubscribe = await userRef.onSnapshot((docSnapshot) => {
      const projectArray = docSnapshot.data().projects;
      setDataList(projectArray);
      console.log(projectArray);
      history.push("/app/inbox");
    });

    setLoading(false);
    return unsubscribe;
  };

  const handleClick = () => {
    setOpen(!open);
  };

  function ListItemLink(props) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef((itemProps, ref) => (
          <Link to={to} ref={ref} {...itemProps} />
        )),
      [to]
    );

    return (
      <li>
        <ListItem button component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }

  return (
    <div className={classes.sidebar_root}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItemLink
          to={`${path}inbox`}
          primary="Inbox"
          icon={<InboxOutlinedIcon />}
        />
        <ListItemLink
          to={`${path}daily`}
          primary="Today"
          icon={<TodayOutlinedIcon />}
        />
        <ListItemLink
          to={`${path}upcoming`}
          primary="Upcoming"
          icon={<DateRangeOutlinedIcon />}
        />
        <AddProject onClick={() => setAddProjectDialog(true)}>
          <AddCircleOutlined style={{ color: "gray" }} />
          <Typography style={{ marginLeft: "30px" }}>Add Project</Typography>
        </AddProject>
        <AddProjectDialog
          addProjectDilog={addProjectDilog}
          setAddProjectDialog={setAddProjectDialog}
        />
        <ListItem button onClick={handleClick}>
          <ListItemText>
            <ProjectTitleContainer>
              <div>Projects</div>
            </ProjectTitleContainer>
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {!isLoading &&
              dataList.map((item) => (
                <ListItemLink
                  to={`${path}project/${item.projectId}`}
                  primary={item.projectName}
                  icon={<StarBorder />}
                />
              ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}
