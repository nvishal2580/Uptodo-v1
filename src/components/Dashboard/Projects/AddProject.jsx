import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { CreateNewProject } from "./ApiCalls";
function AddProjectDialog({ addProjectDilog, setAddProjectDialog }) {
  const [projectType, setProjectType] = useState("new");
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  const handleClose = () => {
    setAddProjectDialog(false);
  };

  const handleSubmit = () => {
    if (projectType === "new") {
      const ProjectData = {
        name: projectName,
        details: projectDetails,
      };
      CreateNewProject(ProjectData);
      handleClose();
      return;
    }
  };
  return (
    <Dialog
      open={addProjectDilog}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <RadioGroup row aria-label="type" name="form-type">
            <FormControlLabel
              value="new"
              control={<Radio />}
              label="create new project"
              onChange={(e) => setProjectType(e.target.value)}
              checked={projectType === "new"}
            />
            <FormControlLabel
              value="exist"
              control={<Radio />}
              label="join already exist project"
              onChange={(e) => setProjectType(e.target.value)}
            />
          </RadioGroup>
        </DialogContentText>
        {projectType === "new" && (
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Project name"
              type="text"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.currentTarget.value)}
            />
            <TextField
              margin="dense"
              id="details"
              label="Project details"
              type="text"
              fullWidth
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.currentTarget.value)}
            />
          </div>
        )}
        {projectType === "exist" && (
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="code"
              label="Enter Project code"
              type="text"
              fullWidth
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          {projectType === "new" ? "Create" : "Join"}
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProjectDialog;
