import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import InputTask from "./InputTask";
import { useDispatch } from "react-redux";
import { addTask } from "../../../store/inboxTasks";
import { v4 as uuidv4 } from "uuid";
import { apiAddTask } from "../../../firebase/api";

const useStyles = makeStyles({
  container: {
    borderBottom: "1px solid gray",
    borderBottomColor: "#dfe6e9",
    padding: 10,
    "&:hover, &:focus": {
      color: "tomato",
    },
  },

  heading: {
    paddingLeft: 30,
  },
  icon: {
    fontSize: 30,
    "&:hover, &:focus": {},
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  btn: {},
});

function AddTask() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputForm, setInputForm] = useState(false);
  const [task, setTask] = useState("");

  const handleInputForm = () => {
    setInputForm(!inputForm);
  };

  const handleSubmit = () => {
    const newTask = {
      title: task,
      subtitle: "",
      isCompleted: false,
      iat: new Date().toString(),
    };

    apiAddTask("/inbox", newTask);
    setInputForm(false);
    setTask("");
  };

  const handleClose = () => {
    setInputForm(false);
    setTask("");
  };

  useEffect(() => {
    console.log("component add task mounted");
  }, []);

  useEffect(() => {
    console.log("component add task re render");
  });

  return (
    <>
      {!inputForm && (
        <Link className={classes.link} onClick={handleInputForm}>
          <Grid container alignItems="center" className={classes.container}>
            <AddCircleOutlineOutlinedIcon className={classes.icon} />
            <Typography className={classes.heading}>Add Task</Typography>
          </Grid>
        </Link>
      )}
      <Grid>
        {inputForm && (
          <InputTask
            handleSubmit={handleSubmit}
            handleClose={handleInputForm}
            setTask={setTask}
            task={task}
          />
        )}
      </Grid>
    </>
  );
}

export default AddTask;
