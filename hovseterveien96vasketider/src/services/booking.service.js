import axios from "axios";

const ROOT_URL =
  "https://us-central1-hovseterveien96vasketider.cloudfunctions.net";

export const getBookings = async () => {
  return await axios(`${ROOT_URL}/getBookings`);
};

export const addBooking = async (name, startDate, endDate, comment, email) => {
  const body = {
    name: name,
    startDate: startDate,
    endDate: endDate,
    comment: comment,
    email: email
  };
  const response = await axios.post(`${ROOT_URL}/addBooking`, body);
  return response;
};

export const deleteBooking = async (id, email) => {
  return await axios.delete(
    `${ROOT_URL}/deleteBooking?id=${id}&email=${email}`
  );
};

export const getUpcomingBooking = async (email) => await axios.get(`${ROOT_URL}/getUpcomingBooking?email=${email}`);
