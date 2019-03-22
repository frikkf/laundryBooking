import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TopNav from '../top-nav/TopNav';
import { getBookings, addBooking, deleteBooking, getUpcomingBooking } from '../../services/booking.service';
import Bookings from '../bookings/bookings';
import UpcomingBooking from '../bookings/UpcomingBooking';

const styles = {

};

const Main = (props) => {
  const { classes, user } = props;

  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [isLoadingUpcomingBooking, setIsLoadingUpcomingBooking] = useState(false);
  const [upcomingBooking, setUpcomingBooking] = useState({booking: null, isUpcoming: false});
  useEffect(() => {
    setIsLoadingBookings(true);
    setIsLoadingUpcomingBooking(true);
    getUpcomingBookingEffect();
    getAllBookings();
  }, []);

  const getUpcomingBookingEffect = () => {
      
      getUpcomingBooking(user.email)
      .then(result => {
        console.log(result);
        setUpcomingBooking(result.data);
        setIsLoadingUpcomingBooking(false);
      })
      .catch(e => {
        setIsLoadingUpcomingBooking(false);
        console.error(e);
      })
  }

  const getAllBookings = () => {
    getBookings()
      .then(result => {
        console.log(result.data);
        const parsedBookings = parseBookings(result.data.bookings);
        setBookings(parsedBookings);
        setIsLoadingBookings(false);
      })
      .catch(error => {
        setIsLoadingBookings(false);
        console.error(error);
      });
  }

  const parseBookings = (bookings) => bookings.map(parseBooking);

  const parseBooking = (bookingData) => ({
    ...bookingData,
    StartDate: new Date(bookingData.StartDate),
    EndDate: new Date(bookingData.EndDate)
  })

  const handleAddBooking = async (startDate, endDate) => {
    try {
      const response = await addBooking(
        user.name,
        startDate.toISOString(),
        endDate.toISOString(),
        '',
        user.email
      );
      console.log(response);
      const booking = parseBooking(response.data.booking);
      setBookings([...bookings, booking]);
      getUpcomingBookingEffect();
    } catch (e) {
      console.error(e);
    }

  }

  

  const handleDeleteBooking = async (booking) => {
    const {id} = booking;
    const email = user.email;
    try {
      await deleteBooking(id, email);
      const newBookings = bookings.filter(b => b.id !== id);
      setBookings(newBookings);
    }catch(e){
      console.error(e);
    }
  }

  const cancelUpcomingBooking = async (booking) => {
    const {id} = booking;
    const email = user.email;
    try {
      await deleteBooking(id, email);
      const newBookings = bookings.filter(b => b.id !== id);
      setBookings(newBookings);
      setUpcomingBooking({booking: null, isUpcoming: false});
    }catch(e){
      console.error(e);
    }
  }

  const renderBookings = () => isLoadingBookings ? 
      <div>Loading bookings...</div> 
      : <Bookings 
        bookings={bookings} 
        handleAddBooking={handleAddBooking} 
        handleDeleteBooking={handleDeleteBooking}
      />

  const renderUpcomingBooking = () => 
    isLoadingUpcomingBooking ? 
    <div>Loading upcoming booking</div> : 
    <UpcomingBooking cancelBooking={() => cancelUpcomingBooking(upcomingBooking.booking)} booking={upcomingBooking.booking}/>
  

  return (
    <Grid container >
      <TopNav />
      <Grid container >
        { upcomingBooking.isUpcoming 
          ?  renderUpcomingBooking()
          :  renderBookings()
        }
      </Grid>
    </Grid>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);