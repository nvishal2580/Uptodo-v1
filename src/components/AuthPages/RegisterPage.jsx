import React, { useState, useEffect } from "react";
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
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { auth } from "./../../firebase/firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth";
import firebase, { db } from "../../firebase/firebase";
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
}));

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  // const preventDefault = (event) => event.preventDefault();

  const handleSumbmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        // firebase
        //   .database()
        //   .ref("users/" + user.uid.toString())
        //   .set({
        //     username: username,
        //     email: user.email,
        //   });
        console.log("fire = ", firebase);
        db.collection("users")
          .doc(user.uid)
          .set({ username: username, email: user.email, projects: [] });

        localStorage.setItem("user", user.uid);
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
        // history.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) console.log("current user", user);
      else console.log("no user logged in");
    });

    return unsubscribe;
  }, []);

  return (
    <Container maxWidth="xs">
      <ToastContainer />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon fontSize="large" />
        </Avatar>
        <Typography className={classes.title}>Sign Up</Typography>
        <form onSubmit={handleSumbmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="text"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Create Password"
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
            Sign Up
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link href="/login" className={classes.link} variant="inherit">
              Already have Account ? Register Here
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default RegisterPage;
