import axios from 'axios';

const API_URL = "https://sistema-agendamento-lovat.vercel.app/services";

export async function getDashboardStats() {
  const response = await axios.get("https://sistema-agendamento-lovat.vercel.app/dashboard/stats");
  return response.data;
}