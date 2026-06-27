import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getDashboardSummary = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/admin/dashboard`
  );

  return response.data;
};

export const getAiBriefing = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/admin/ai-briefing`
  );

  return response.data;
};

export const getMonthlyRevenue = async (year = 2026) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/admin/revenue-stats?year=${year}`
  );

  return response.data;
}