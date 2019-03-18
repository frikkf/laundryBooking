import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TopNav from '../top-nav/TopNav';


const styles = {
  
};

const Main = (props) => {
  const { classes } = props;
  return (
    <Grid container >
      <TopNav />
    </Grid>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);