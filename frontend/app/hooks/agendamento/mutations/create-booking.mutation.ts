import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createBooking } from "@/app/services/agendamento/booking.service";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["available-hours"],
      });

      queryClient.invalidateQueries({
        queryKey: ["available-days"],
      });
    },
  });
}