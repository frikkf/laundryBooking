import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BookingSlot from "./BookingSlot";
import { Grid } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const styles = theme => ({
  container: {
    '& button': {
      margin:'0.5rem'
    }
  },
  unavailable: {
    backgroundColor: 'red'
  }
});

const BookingDay = props => {
  const { classes, date, slots, handleAddBooking, handleDeleteBooking } = props;
  const isAvailable = slots.some(s => s === null);
  
  return (
    <ExpansionPanel disabled={isAvailable ? false : true} className={isAvailable ? '' : classes.unavailable}>
      <ExpansionPanelSummary expandIcon={isAvailable? <ExpandMoreIcon /> : null}>
        <Typography className={classes.heading}>
          {date.toDateString()} {isAvailable ? '' : 'INGEN LEDIG TID'}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid className={classes.container} container direction="column">
        {slots.map((s, slotIndex) => (
          <BookingSlot 
            key={slotIndex} 
            addBooking={handleAddBooking} 
            deleteBooking={handleDeleteBooking}
            slotIndex={slotIndex} 
            isAvailable={s === null} 
          /> 
        ))}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

BookingDay.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.any.isRequired,
  slots: PropTypes.array.isRequired,
  handleAddBooking: PropTypes.func.isRequired
};

export default withStyles(styles)(BookingDay);
