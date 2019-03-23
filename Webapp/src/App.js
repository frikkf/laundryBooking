import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";

import Main from "./components/main/Main";

const emptyUser = {email: null, name: null};

const App = (props) => {
  const {classes, auth} = props;
  console.log("USER", auth.user);
  const {email, name} = auth.user
  const [user, setUser] = useState({email: email, name: name});

  const logout = () => {
    auth.logout();
    setUser(emptyUser);
  }

  return (
    <Main user={user} logout={logout} {...props} />
  );
};

const styles = theme => ({
})

export default withStyles(styles)(App);
