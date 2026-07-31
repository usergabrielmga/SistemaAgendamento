"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchBooking } from "./queries/booking-success.query";

export function useBookingSuccess(
  id: number
) {
  return useQuery({
    queryKey: [
      "booking",
      id,
    ],
    queryFn: () =>
      fetchBooking(id),
    enabled: !!id,
  });
}