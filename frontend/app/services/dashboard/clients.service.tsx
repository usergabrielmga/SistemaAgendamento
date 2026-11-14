import axios from "axios";

const API_URL = "https://sistema-agendamento-lovat.vercel.app/clients";

export const getClients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}