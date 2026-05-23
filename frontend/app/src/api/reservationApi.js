import axios from "axios"

const API_BASE_URL = "http://localhost:8080";

export const createReservation = async (request) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/reservations`,
    request
  );

  return response.data;
};

export const getReservation = async (reservationId) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/reservations/${reservationId}`
  );

  return response.data;
}

export const searchReservation = async ({ reservationId, guestPhone }) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/reservations/search`,
    {
      params: {
        reservationId,
        guestPhone,
      },
    }
  );

  return response.data;
}

export const cancelReservation = async (reservationId) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/reservations/${reservationId}/cancel`
  );

  return response.data;
}

export const getReservations = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/reservations`
  );

  return response.data;
}

export const checkInReservation = async (reservationId) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/reservations/${reservationId}/check-in`
  );

  return response.data;
}

export const checkOutReservation = async (reservationId) => {
  const reseponse = await axios.patch(
    `${API_BASE_URL}/api/reservations/${reservationId}/check-out`
  );

  return reseponse.data;
}