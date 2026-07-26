"use client";

import { useQuery } from "@tanstack/react-query";
import { getAvailableDays } from "@/app/services/agendamento/booking.service";

export function useAvailableDays(
  serviceId?: number,
  month?: number,
  year?: number
) {
  return useQuery({
    queryKey: [
      "available-days",
      serviceId,
      month,
      year,
    ],

    queryFn: () =>
      getAvailableDays(
        serviceId!,
        month!,
        year!
      ),

    enabled:
      !!serviceId &&
      month !== undefined &&
      year !== undefined,

    staleTime: 1000 * 60,
  });
}