import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import UseInterval from '../../effects/UseInterval';

const UpcomingBooking = props => {
  const {booking, cancelBooking} = props;
  const startDate = new Date(booking.StartDate);
  const now = new Date();

  const [timeLeftMs, setTimeLeftMs] = useState(startDate - now);

  UseInterval(() => {
    // Your custom logic here
    setTimeLeftMs(timeLeftMs - 1000);
  }, 1000);

  return (
    <Grid container direction="column">
    
      <p>Hei {booking.Name}</p>
    
      <p>{msToTime(timeLeftMs)} til din neste vasketime</p>

      <Button 
        variant="contained" 
        type="button" 
        color="primary" 
        onClick={() => cancelBooking(booking)}>
        Kansellér
      </Button>
      
    </Grid>
  );
};

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor((duration/ (1000 * 60 * 60 * 24)));

  days = (days < 10) ? "0" + days : days;
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return days + ":" + hours + ":" + minutes + ":" + seconds;
}

export default UpcomingBooking;