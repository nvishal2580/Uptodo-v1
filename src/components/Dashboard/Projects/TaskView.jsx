import React from "react";

import {
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  DialogTitle,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
function TaskView({ openDialog, handleCloseDialog, task, columnId }) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Material-UI
          </Link>
          <Link color="inherit" href="/getting-started/installation/">
            Core
          </Link>
          <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
      </DialogTitle>
      <DialogContent>
        <Typography>{task.text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCloseDialog} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskView;
