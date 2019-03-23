import axios from "axios";

const ROOT_URL =
  "https://us-central1-hovseterveien96vasketider.cloudfunctions.net";

export const getBookings = async () => {
  return await axios(`${ROOT_URL}/getBookings`);
};

export const addBooking = async (name, startDate, endDate, comment, createdBy) => {
  const body = {
    name: name,
    startDate: startDate,
    endDate: endDate,
    comment: comment,
    createdBy: createdBy
  };
  const response = await axios.post(`${ROOT_URL}/addBooking`, body);
  return response;
};

export const deleteBooking = async (id, createdBy) => {
  return await axios.delete(
    `${ROOT_URL}/deleteBooking?id=${id}&createdBy=${createdBy}`
  );
};

export const getUpcomingBooking = async (createdBy) => await axios.get(`${ROOT_URL}/getUpcomingBooking?createdBy=${createdBy}`);
