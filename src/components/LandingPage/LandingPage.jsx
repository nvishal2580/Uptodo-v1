import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Redirect } from "react-router";

const LandingPage = () => {
  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h3">Welcome to Todo App</Typography>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="outlined"
          style={{ margin: "10px" }}
          href="/login"
        >
          Login
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          style={{ margin: "10px" }}
          href="/register"
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
