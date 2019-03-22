import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import SignIn from "./components/sign-in/SignIn";
import Main from "./components/main/Main";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({email: null, name: null});

  const onSignInSubmitted = () => setSignedIn(true);

  const onGoogleAuthSuccess = (response) => {
    console.log(response);
    setUser({email: response.profileObj.email, name: response.profileObj.name});
    setSignedIn(true);
    saveLoginData(response);
  }

  const saveLoginData = (loginData) => {
    sessionStorage.setItem('LOGIN_DATA',JSON.stringify(loginData));
  }

  const getLoginDataFromCache = () => {
    const data = sessionStorage.getItem('LOGIN_DATA');
    if(data) return JSON.parse(data);
    return undefined;
  }

  useEffect( () => {
    const loginData = getLoginDataFromCache();
    if(loginData) {
      setUser({email: loginData.profileObj.email, name: loginData.profileObj.name});
      setSignedIn(true);
    }
  }, []);

  return (
    <Grid container>
      {signedIn ? <Main user={user} /> : <SignIn submit={onSignInSubmitted} onGoogleAuthSuccess={onGoogleAuthSuccess} />}
    </Grid>
  );
};

export default App;
