import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import SignIn from "./components/sign-in/SignIn";
import { Route, Router } from 'react-router-dom';
import Auth from "./Auth/Auth";
import Callback from "./Callback/Callback";
import history from './history';
import App from './App';

const AppRoutes = (props) => {
  const {classes} = props;

  const auth = new Auth();

  const handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    }
  }

  return (
    <Router history={history}>
        <Grid container className={classes.root}>

          <Route path="/" exact render={(props) => {
            return auth.isAuthenticated() ? 
                <App auth={auth} {...props} />
              : <SignIn auth={auth} {...props}/>
          }} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>

        </Grid>
    </Router>
  );
};

const styles = theme => ({
  root: {
    backgroundColor: '#4BA6F5',
    height: '100vh'
  }
})

export default withStyles(styles)(AppRoutes);
