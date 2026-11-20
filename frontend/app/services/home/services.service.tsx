import axios from "axios";

const API_URL = "https://sistema-agendamento-lovat.vercel.app/booking";

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