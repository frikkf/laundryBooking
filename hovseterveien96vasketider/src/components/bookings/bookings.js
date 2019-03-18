import React, { useState, useEffect } from 'react';
import { getBookings } from '../../services/booking.service';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getBookings()
      .then(result => {
        console.log(result.data);
        setBookings(result.data.bookings)
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <>
      <div>Bookings works</div>
      <ul>
        {bookings.map((b, index) => (<li key={index}><p>{b.Comment}</p></li>))}
      </ul>
    </>
  );
};

export default Bookings;