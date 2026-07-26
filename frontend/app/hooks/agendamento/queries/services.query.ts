"use client";

import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../services/agendamento/booking.service"

export function useServices() {
  return useQuery({
    queryKey: ["booking-services"],
    queryFn: getServices,
    staleTime: 1000 * 60 * 5,
  });
}