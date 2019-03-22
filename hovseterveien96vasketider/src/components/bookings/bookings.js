import React from 'react';
import BookingDay from './BookingDay';
import { Grid } from '@material-ui/core';

const getDate = () => {
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const fillSlots = (slots, bookings) => {
  return slots.map((s, index) => {
    const startTime = 8 + index * 2;
    const endTime = startTime + 2; 
    const booking = bookings.find(b => b.StartDate.getHours() >= startTime && b.EndDate.getHours() <= endTime);
    return booking ? booking : null;
  });
}

const getDatesFromSlot = (date, slotIndex) => {
  const startTime = 8 + slotIndex * 2;
  const endTime = startTime + 2; 
  let startDate = new Date(date)
  startDate.setHours(startTime);
  let endDate = new Date(date);
  endDate.setHours(endTime, -1);
  return [startDate, endDate];
}

const Bookings = props => {
  const {bookings, handleAddBooking, handleDeleteBooking} = props;
  const slots = Array(7).fill(0);
  const data = Array(30).fill(0).map((num, index) => {
    let date = getDate();
    date.setDate(date.getDate() + index);
    const nextDate = addDays(date, 1);
    const bookingsThisDate = bookings.filter(booking => booking.StartDate >= date && booking.EndDate < nextDate);
    return {date: date, slots: fillSlots(slots, bookingsThisDate)};
  });
  return (
    <Grid container >
      <Grid item xs={12} >
        {data.map((dateObj, index) => (
          <BookingDay 
            key={index} 
            date={dateObj.date} 
            slots={dateObj.slots}
            handleAddBooking={ slotIndex => {
              const [start, end] = getDatesFromSlot(dateObj.date, slotIndex);
              handleAddBooking(start, end);
            }}
            handleDeleteBooking={(slotIndex) => handleDeleteBooking(dateObj.slots[slotIndex])}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Bookings;