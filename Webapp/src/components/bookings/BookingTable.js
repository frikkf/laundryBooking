import React from 'react';
import BookingDay from './BookingDay';

const Bookings = props => {
  const {bookings} = props;
  return (
    <>
      <div>BookingTable works</div>
      <BookingDay />
    </>
  );
};

export default Bookings;