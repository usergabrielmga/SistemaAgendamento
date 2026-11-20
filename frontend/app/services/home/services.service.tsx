import axios from "axios";

const API_URL = "http://localhost:3001/booking";

export async function getServices() {
  try {
    const response = await axios.get(API_URL);

    console.log("Serviços recebidos da API:", response.data);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    throw error;
  }
}