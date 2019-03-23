import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Slide, Dialog, DialogTitle } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = () => ({

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const AlertDialog = props => {
  const { open, onClickClose } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClickClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {"Booker valgt tid. Vennligst vent"}
      </DialogTitle>
      <LinearProgress />
    </Dialog>
  );
};

AlertDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AlertDialog);
