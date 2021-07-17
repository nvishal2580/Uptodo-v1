import React from "react";
import { Avatar, Grid, Typography, Paper, Button } from "@material-ui/core";
import { EmailOutlined } from "@material-ui/icons";

function Profile(props) {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ marginTop: "70px" }}
    >
      <Paper
        style={{
          width: "700px",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ flexDirection: "column" }}
        >
          <Avatar style={{ width: "150px", height: "150px" }} />
          <Typography variant="h4">Vishal</Typography>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <EmailOutlined color="primary" style={{ fontSize: "40px" }} />
          <Typography style={{ padding: "20px", fontSize: "30px" }}>
            vn@gamil.com
          </Typography>
        </div>
        <div style={{ margin: "30px" }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: "20px" }}
          >
            Update
          </Button>
          <Button variant="outlined" color="secondary">
            Delete
          </Button>
        </div>
      </Paper>
    </Grid>
  );
}

export default Profile;
