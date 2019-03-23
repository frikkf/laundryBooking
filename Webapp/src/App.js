import React, { useState } from "react";
import { withStyles } from "@material-ui/core";

import Main from "./components/main/Main";

const emptyUser = {id: null, name: null};

const App = (props) => {
  const {auth} = props;
  console.log("USER", auth.user);
  const {sub, name} = auth.user
  const [user, setUser] = useState({id: sub, name: name});

  const logout = () => {
    auth.logout();
    setUser(emptyUser);
  }

  return (
    <Main user={user} logout={logout} {...props} />
  );
};

const styles = () => ({
})

export default withStyles(styles)(App);
