import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TasksList from "./TasksList";
import AddTask from "./AddTask";
import SortIcon from "@material-ui/icons/Sort";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  title: {
    fontSize: 35,
    fontFamily: "Roboto",
  },
  titleContainer: {},
  headingContainer: {
    justifyContent: "center",
    borderBottomColor: "#f1f2f6",
    borderBottom: "2px solid gray",
    marginTop: 20,
    marginBottom: 20,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    marginRight: 20,
  },
  inbox_container: {
    // backgroundColor: "yellow",
  },
});
function Inbox(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newVal) => {
    setValue(newVal);
  };

  return (
    <Grid container className={classes.inbox_container}>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Grid xs={12} item container className={classes.headingContainer}>
          <Grid xs={8}>
            <div className={classes.titleContainer}>
              <span className={classes.title}>Inbox</span>
            </div>
          </Grid>
          <Grid xs={4} className={classes.iconContainer}>
            <span className={classes.iconWrapper}>
              <IconButton>
                <ChatBubbleOutlineOutlinedIcon />
              </IconButton>
            </span>
            <span className={classes.iconWrapper}>
              <IconButton>
                <SortIcon />
              </IconButton>
            </span>
          </Grid>
        </Grid>
        <Grid item>
          <Paper square style={{ marginBottom: 20 }}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
              variant="fullWidth"
            >
              <Tab label="Pending" />
              <Tab label="Completed" />
            </Tabs>
          </Paper>
          {value === 0 ? <AddTask /> : ""}
          <TasksList indexId={value} />
        </Grid>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default Inbox;
