import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const confirmPayment = async (request) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/payments/confirm`,
    request
  );

  return response.data;
};