import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { auth } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./Auth";

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const history = useHistory();

  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default ProtectedRoute;
