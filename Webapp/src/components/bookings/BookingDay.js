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
import classNames from 'classnames';

const styles = theme => ({
  container: {
    '& button': {
      margin:'0.5rem'
    }
  },
  unavailable: {
    backgroundColor: 'red'
  },
  weekStart: {
    borderTop: '.2rem solid lightgrey'
  },
  expanded: {
    margin: 0
  }
});

const BookingDay = props => {
  const { classes, date, slots, handleAddBooking, handleDeleteBooking } = props;
  const isAvailable = slots.some(s => s === null);
  const isMonday = date.toDateString().split(' ')[0] === 'Mon';

  return (
    <ExpansionPanel classes={{expanded: classes.expanded}} disabled={isAvailable ? false : true} className={classNames(isAvailable ? '' : classes.unavailable, isMonday ? classes.weekStart : '')}>
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
