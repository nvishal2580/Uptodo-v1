import React, { useRef, useEffect } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
function InputTask({ setTask, task, handleSubmit, handleClose }) {
  //   const taskRef = useRef();

  useEffect(() => {
    console.log("component inpu task mounted");
  }, []);

  useEffect(() => {
    console.log("component inpu task re render");
  });

  return (
    <div>
      <Paper
        style={{
          padding: "10px",
          borderRadius: 5,
          marginBottom: "10px",
        }}
      >
        <TextField
          variant="outlined"
          value={task}
          label="Add task"
          fullWidth
          onChange={(e) => setTask(e.currentTarget.value)}
          autoFocus
        />
        <div>
          <Button
            variant="outlined"
            style={{
              backgroundColor: "tomato",
              color: "white",
              margin: "5px",
            }}
            disabled={task === "" ? true : false}
            onClick={handleSubmit}
          >
            Add Task{" "}
          </Button>
          <Button style={{ margin: "5px" }} onClick={handleClose}>
            Cancel{" "}
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default InputTask;
