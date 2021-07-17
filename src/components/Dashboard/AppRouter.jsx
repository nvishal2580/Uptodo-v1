import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Inbox from "./TasksFiles/Inbox";
import Daily from "./TasksFiles/Daily";
import Upcoming from "./TasksFiles/Upcoming";
import Project from "./Projects/Project";

const AppRouter = ({ children }) => {
  return (
    <Router>
      <Switch>
        <Route path="/app/inbox" component={Inbox} />
        <Route path="/app/daily" component={Daily} />
        <Route path="/app/upcoming" component={Project} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
