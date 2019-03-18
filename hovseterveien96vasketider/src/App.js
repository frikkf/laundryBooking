import React, { useState } from "react";
import Bookings from "./components/bookings/bookings";
import { Grid } from "@material-ui/core";
import SignIn from "./components/sign-in/SignIn";
import Main from "./components/main/Main";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  const onSignInSubmitted = () => setSignedIn(true);

  const onGoogleAuthSuccess = (response) => {
    console.log(response);
    setSignedIn(true);
  }

  return (
    <Grid container>
      {signedIn ? <Main /> : <SignIn submit={onSignInSubmitted} onGoogleAuthSuccess={onGoogleAuthSuccess} />}
    </Grid>
  );
};

export default App;
