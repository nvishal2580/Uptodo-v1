import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import firebase, { db } from "../../../firebase/firebase";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast, ToastContainer } from "react-toastify";

function ProjectUsers({
  open,
  handleClose,
  isAdmin,
  projectId,
  members,
  projectName,
}) {
  const [email, setEmail] = useState("");
  console.log("members", members);
  const handleAddMember = async (e) => {
    if (email == null || email == "") return;

    const projectRef = db.collection("projects").doc(projectId);

    const userRef = db.collection("users");
    const snapshot = await userRef.where("email", "==", email).get();
    if (snapshot.size < 1) toast.info("No user has this Email id");
    snapshot.forEach((doc) => {
      const memberId = doc.id;
      const memberData = {
        id: memberId,
        username: doc.data().username,
      };
      projectRef.update({
        ["memberData"]: firebase.firestore.FieldValue.arrayUnion(memberData),
      });
      userRef.doc(memberId).update({
        projects: firebase.firestore.FieldValue.arrayUnion({
          projectId,
          projectName,
        }),
      });
    });
    setEmail("");
  };

  const handleRemoveMember = async (member) => {
    const projectRef = db.collection("projects").doc(projectId);
    const userRef = db.collection("users").doc(member.id);
    projectRef.update({
      ["memberData"]: firebase.firestore.FieldValue.arrayRemove(member),
    });
    userRef.update({
      projects: firebase.firestore.FieldValue.arrayRemove({
        projectId,
        projectName,
      }),
    });
  };

  return (
    <div>
      <ToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Add member</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              autoFocus
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <div style={{ marginLeft: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                disabled={!isAdmin}
                onClick={handleAddMember}
              >
                Add
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Roboto",
              marginTop: "30px",
            }}
          >
            {members && members.length > 0 && (
              <div style={{ alignSelf: "center", fontSize: "20px" }}>
                Members
              </div>
            )}
            <List dense>
              {members &&
                members.map((data, index) => (
                  <ListItem key={index} onClick={() => console.log(index)}>
                    <ListItemText>{data.username}</ListItemText>
                    {isAdmin ? (
                      <IconButton onClick={() => handleRemoveMember(data)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </ListItem>
                ))}
            </List>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProjectUsers;
