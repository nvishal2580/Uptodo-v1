import React, { useState } from "react";
import {
  Checkbox,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask, updateTask } from "../../store/inboxTasks";
import { apiDeleteTask, apiToggleTask } from "../../firebase/api";
import { apiUpdateTask } from "./../../firebase/api";
function Task({ data }) {
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenTask(false);
  };

  const handleDelete = () => {
    console.log("delete clicked");
    dispatch(deleteTask(data.id));
    apiDeleteTask("/inbox", data.id);
  };

  const handleChange = () => {
    dispatch(toggleTask(data.id));
    apiToggleTask("/inbox", { id: data.id });
  };

  const handleUpdateData = () => {
    let updatedTask = {
      id: data.id,
      title: title,
      subtitle: subtitle,
      isCompleted: data.isCompleted,
      iat: data.iat,
    };
    dispatch(updateTask(updatedTask));
    apiUpdateTask("/inbox", data.id, updatedTask);
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        style={{
          borderBottom: "1px solid gray",
          borderBottomColor: "#dfe6e9",
          flexWrap: "nowrap",
        }}
      >
        <Checkbox
          style={{ color: "green" }}
          checked={data.isCompleted}
          onChange={handleChange}
        />

        <Typography
          onClick={() => setOpenTask(true)}
          noWrap
          style={{ fontSize: 20, paddingLeft: 20, cursor: "pointer" }}
        >
          {data !== undefined ? data.title : ""}
        </Typography>

        <Grid item style={{ flexGrow: 1 }}></Grid>
        <Grid item>
          <Typography>
            {data !== undefined ? new Date(data.iat).toLocaleDateString() : ""}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleClickOpen}>
            <EditOutlinedIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={handleDelete}>
            <DeleteForeverOutlinedIcon color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{"Edit Task Here"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Make task changes here</DialogContentText>
          <div style={{ marginBottom: 20 }}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label=" Task Title"
              variant="outlined"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              fullWidth
            />
          </div>
          <TextField
            margin="dense"
            id="subtitle"
            label=" Task Subtitle"
            variant="outlined"
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.currentTarget.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateData} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openTask}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{data.title}</DialogTitle>
        <DialogContent>
          <Typography>{data.subtitle}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Task;
