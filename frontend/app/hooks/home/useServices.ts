"use client";

import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/app/services/home/services.service";

export function useServices() {
  return useQuery({
    queryKey: ["home-services"],
    queryFn: getServices,
    staleTime: 1000 * 60 * 5,
  });
}