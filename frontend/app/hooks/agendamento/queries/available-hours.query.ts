"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { getAvailableHours } from "@/app/services/agendamento/booking.service";


export function useAvailableHours(
  serviceId?: number,
  date?: Date | null
) {

  const formattedDate = date
    ? format(date, "yyyy-MM-dd")
    : undefined;


  return useQuery({
    queryKey: [
      "available-hours",
      serviceId,
      formattedDate,
    ],

    queryFn: () =>
      getAvailableHours(
        serviceId!,
        formattedDate!
      ),

    enabled:
      !!serviceId &&
      !!formattedDate,

    staleTime: 0,
  });
}