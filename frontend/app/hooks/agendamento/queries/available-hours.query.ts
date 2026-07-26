import { useQuery } from "@tanstack/react-query";
import { getAvailableHours } from "@/app/services/agendamento/booking.service";


export function useAvailableHours(
  serviceId?: number,
  date?: Date | null
) {
  return useQuery({
    queryKey: [
      "available-hours",
      serviceId,
      date,
    ],

    queryFn: () =>
      getAvailableHours(
        serviceId!,
        date!
      ),

    enabled:
      !!serviceId &&
      !!date,
  });
}