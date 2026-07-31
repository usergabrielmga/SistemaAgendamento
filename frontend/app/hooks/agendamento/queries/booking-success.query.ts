import { getBooking } from "@/app/services/agendamento/booking.service";

export async function fetchBooking(
  id: number
) {
  return getBooking(id);
}