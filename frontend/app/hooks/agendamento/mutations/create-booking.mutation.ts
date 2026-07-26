import { useMutation } from "@tanstack/react-query";

import { createBooking } from "@/app/services/agendamento/booking.service";


export function useCreateBooking() {

  return useMutation({
    mutationFn: createBooking,
  });

}