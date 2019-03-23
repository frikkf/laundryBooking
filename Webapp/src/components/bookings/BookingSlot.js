import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const styles = theme => ({
  available: {

  },
  unavailable: {}
});

const BookingSlot = props => {
  const { classes, isAvailable, slotIndex, addBooking, deleteBooking } = props;
  
  const startTime = 8 + slotIndex * 2;
  const endTime = startTime + 2;
  const onClick = (e) => {
    e.preventDefault(); 
    isAvailable ? addBooking(slotIndex) : deleteBooking(slotIndex)
  } 
  return (
      <Button onClick={onClick} variant="contained" color={isAvailable ? "primary": "secondary"}>
        {`${startTime} - ${endTime}`}
      </Button>
  );
};

BookingSlot.propTypes = {
  classes: PropTypes.object.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  slotIndex: PropTypes.number.isRequired,
  addBooking: PropTypes.func.isRequired
};

export default withStyles(styles)(BookingSlot);
