import { getServices } from "@/app/services/dashboard/services.service";

import { Services } from "@/app/types/dashboard/services.type";


export async function fetchServices(): Promise<Services[]> {

  const services = await getServices();

  return services;

}