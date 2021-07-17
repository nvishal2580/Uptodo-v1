import React, { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Typography, IconButton } from "@material-ui/core";
import styled from "styled-components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TaskView from "./TaskView";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  flex: 1;
  cursor: pointer;
`;

function TaskContainer({ task, handleDeleteTask, columnId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleDeleteTask(task.id, columnId);
    handleClose();
  };

  return (
    <Container>
      <Text onClick={() => setOpenDialog(true)}>{task.text}</Text>
      <IconButton onClick={handleClick}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <EditIcon color="primary" />
            <Typography style={{ paddingLeft: "20px" }}>Edit</Typography>
          </div>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <div style={{ display: "flex" }}>
            <DeleteIcon color="secondary" />
            <Typography style={{ paddingLeft: "20px" }}>Delete</Typography>
          </div>
        </MenuItem>
        <TaskView
          task={task}
          columnId={columnId}
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
        />
      </Menu>
    </Container>
  );
}

export default TaskContainer;
