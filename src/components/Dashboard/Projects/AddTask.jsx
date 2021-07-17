import React, { useState } from "react";
import styled from "styled-components";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";

const Container = styled.div`
  display: ${(props) => (props.isDraggingOver ? "none" : "flex")};
  padding: 10px;
  margin: 8px;
  /* border: 1px solid gray; */
  min-width: 200px;
  max-height: 30px;
  align-items: center;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  justify-content: center;
  transition: box-shadow 0.3s;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0px;
  background-color: white;
  :hover {
    color: red;
    cursor: pointer;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;

const Title = styled.span`
  margin: 0 10px;
`;

function AddTask({
  title,
  type,
  isDraggingOver,
  handleAddColumn,
  handleAddTask,
  columnId,
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (text === "") return;

    if (type === "column") {
      handleAddColumn(text);
      setText("");
      setOpen(false);
      return;
    }

    handleAddTask(columnId, text);
    setText("");
    setOpen(false);
  };

  return (
    <Container isDraggingOver={isDraggingOver}>
      <div
        onClick={() => setOpen(true)}
        style={{ display: "flex", alignItems: "center" }}
      >
        <AddCircleOutlinedIcon />
        <Title>{title}</Title>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AddTask;
