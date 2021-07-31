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
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./components/AuthPages/Auth";

import ProtectedRoute from "./components/AuthPages/protectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <ProtectedRoute path="/app/" component={Dashboard}></ProtectedRoute>
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
