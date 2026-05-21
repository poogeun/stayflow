import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export async function getRooms() {
  const response = await axios.get(
    `${API_BASE_URL}/api/rooms`
  );

  return response.data;
}