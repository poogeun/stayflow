import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const postChat = async (messages) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/chat`,
    {
      messages
    }
  );

  return response.data.content;
};