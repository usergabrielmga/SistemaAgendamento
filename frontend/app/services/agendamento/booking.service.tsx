import axios from "axios";
import { BookingService } from "../../types/agendamento/booking.types";

interface CreateBookingPayload {
  serviceId: number;
  date: string;
  hour: string;
  name: string;
  phone: string;
  email: string;
}

const API_URL = "http://localhost:3001/booking";

export async function getServices(): Promise<BookingService[]> {
  const response = await axios.get<BookingService[]>(
    `${API_URL}`
  );

  return response.data.map((service) => ({
    ...service,
    price: Number(service.price),
  }));
}

export async function getAvailableDays(
  serviceId: number,
  month: number,
  year: number
) {
  const response = await axios.get(
    `${API_URL}/available-days`,
    {
      params: {
        serviceId,
        month,
        year,
      },
    }
  );

  return response.data as string[];
}

export async function getAvailableHours(
  serviceId: number,
  date: string
) {

  const response = await axios.get(
    `${API_URL}/${serviceId}/hours`,
    {
      params: {
        date,
      },
    }
  );


  return response.data;
}
export async function createBooking(
  data: CreateBookingPayload
) {

  const response = await axios.post(
    `${API_URL}`,
    data
  );

  return response.data;
}

export async function getBooking(
  id: number
) {
  const { data } = await axios.get(
    `${API_URL}/${id}`
  );

  return data;
}