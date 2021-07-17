import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/AuthPages/RegisterPage";
import LoginPage from "./components/AuthPages/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import { getUser } from "./store/auth";
import "react-toastify/dist/ReactToastify.css";
import store from "./store/store";

import ProtectedRoute from "./components/AuthPages/protectedRoute";

const App = () => {
  const getComponent = () => {
    const currentUser = getUser(store.getState());

    const userId = localStorage.getItem("userId");
    if (currentUser !== undefined && userId !== undefined) {
      return <Dashboard />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <ProtectedRoute path="/app/" component={Dashboard}></ProtectedRoute>
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};

export default App;
