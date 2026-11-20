import axios from "axios";

const API_URL = "https://sistema-agendamento-lovat.vercel.app/login";

export const login = async (username: string, password: string) => {
  const response = await axios.post(API_URL, {
    username,
    password,
  });

  return response.data;
};