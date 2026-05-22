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