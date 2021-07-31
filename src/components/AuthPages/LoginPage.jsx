import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import { auth } from "./../../firebase/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth";
import SyncLoader from "react-spinners/SyncLoader";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
    padding: "5px",
  },
  title: {
    fontSize: "25px",
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.text.light,
  },
  link: {
    fontSize: "13px",
  },
  logingIndicator: {
    position: "absolute",
    top: "7%",
    left: "47%",
    zIndex: 10,
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSumbmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          let user = userCredential.user;
          user = {
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
          };
          console.log(user);
          localStorage.setItem("userId", user.uid);
          dispatch(setUser({ ...user }));
          console.log("user at login page");
          history.push("/app/inbox");
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Invalid Email or Password !", { autoClose: 2000 });
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/network-request-failed")
        toast.error("Network error !");
      else toast.info("Invalid Email or Password !", { autoClose: 2000 });
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "2px" }}>
      <ToastContainer />
      <div className={classes.logingIndicator}>
        {isLoading && <SyncLoader color="red" size={25} />}
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography className={classes.title}>Login</Typography>
        <form onSubmit={handleSumbmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link className={classes.link} variant="inherit">
              Forgot Password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" className={classes.link} variant="inherit">
              Don't have Account ? Register Here
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default LoginPage;
