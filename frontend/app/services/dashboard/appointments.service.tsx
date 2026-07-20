import axios from "axios";

const API_URL = "http://localhost:3001/appointments";

export async function getAppointments() {
    const response = await axios.get(API_URL);
    return response.data;
}

export async function updateAppointmentStatus(
  id: number,
  status: string
) {
  const response = await axios.patch(
    `${API_URL}/${id}/status`,
    {
      status,
    }
  );

  return response.data;
}