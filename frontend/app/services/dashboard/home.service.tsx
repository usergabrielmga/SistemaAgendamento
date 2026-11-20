import axios from 'axios';

const API_URL = "http://localhost:3001/services";

export async function getDashboardStats() {
  const response = await axios.get("http://localhost:3001/dashboard/stats");
  return response.data;
}