import axios from "axios";

const API_URL = "http://localhost:3001/login";

export const login = async (username: string, password: string) => {
  const response = await axios.post(API_URL, {
    username,
    password,
  });

  return response.data;
};