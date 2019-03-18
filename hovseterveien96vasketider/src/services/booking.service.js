import axios from 'axios';

const ROOT_URL = 'https://us-central1-hovseterveien96vasketider.cloudfunctions.net';

export const getBookings = async () => {
  try {
    return await axios(`${ROOT_URL}/getBookings`);
  }catch(e) {
    console.error("Failed to get bookings",e);
  }
};

export const addBooking = async ({user, startDate, endDate, comment}) => {
  try {
    const body = {user:user,startDate:startDate,endDate:endDate,comment:comment};
    return await axios.post(`${ROOT_URL}/addBooking`, body);
  }catch(e) {
    console.error("Failed to add booking",e);
  }
};

export const deleteBooking = async ({id}) => {
  try {
    return await axios.delete(`${ROOT_URL}/deleteBooking?id=${id}`);
  }catch(e) {
    console.error("Failed to delete booking",e);
  }
};

