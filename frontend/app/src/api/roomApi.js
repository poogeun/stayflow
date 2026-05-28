import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export async function getRooms() {
  const response = await axios.get(
    `${API_BASE_URL}/api/rooms`
  );

  return response.data;
}

export const completeCleaningRoom = async (roomId) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/rooms/${roomId}/cleaning-complete`
  );

  return response.data;
};

export const updateRoomStatus = async (
  roomId,
  status
) => {
  const response = await axios.patch(
    `${API_BASE_URL}/api/rooms/${roomId}/status`,
    {
      status,
    }
  );

  return response.data;
}

export const getAvailableRooms = async (checkInDate, checkOutDate) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/rooms/available`,
    {
      params: {
        checkInDate,
        checkOutDate,
      },
    }
  );

  return response.data;
};