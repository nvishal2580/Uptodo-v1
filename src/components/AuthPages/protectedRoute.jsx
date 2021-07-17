import React from "react";
import { Redirect, Route } from "react-router";
import { auth } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";
import { getUser } from "./../../store/auth";
import store from "../../store/store";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();

  const isAuthenticated = () => {
    const userData = getUser(store.getState());
    const userId = localStorage.getItem("userId");
    if (userData.isAuthenticated === true || userId !== null) return true;
    else return false;
  };

  return (
    <Route
      {...rest}
      render={(prop) => {
        if (isAuthenticated()) {
          return <Component {...prop} />;
        } else {
          history.push("/");
        }
      }}
    />
  );
};

export default ProtectedRoute;
