import React, { useState } from "react";
import { Grid, Button, Typography, withStyles, Paper } from "@material-ui/core";
import UseInterval from "../../effects/UseInterval";

const UpcomingBooking = props => {
  const { classes, booking, cancelBooking } = props;
  const startDate = new Date(booking.StartDate);
  const now = new Date();

  const [timeLeftMs, setTimeLeftMs] = useState(startDate - now);

  UseInterval(() => {
    setTimeLeftMs(timeLeftMs - 1000);
  }, 1000);

  

  return (
    <Grid
      className={classes.container}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Paper className={classes.paperContainer}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="body1" gutterBottom>
            Hei {booking.Name}
          </Typography>
          {}
          <Duration {...msToTime(timeLeftMs)} />
          <Typography variant="body1" gutterBottom>
            til din neste vasketime
          </Typography>
          <Typography variant="h5" gutterBottom>
            {startDate.toDateString()}
          </Typography>

          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={() => cancelBooking(booking)}
          >
            Kansellér
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

const Duration = ({days, hours, minutes, seconds}) => {
  if(days === 0) return <Typography variant="h3" gutterBottom>{`${hours} : ${minutes} : ${seconds}`}</Typography>;
  return <Typography variant="h3" gutterBottom>{days} dager</Typography>
}


const styles = theme => ({
  container: {
    padding: "1rem"
  },
  paperContainer: {
    padding: "2rem"
  }
});

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor(duration / (1000 * 60 * 60 * 24));

  days = days < 10 ? days : days;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return {days: days, hours: hours, minutes: minutes, seconds: seconds};
}

export default withStyles(styles)(UpcomingBooking);
