import { getWorkingHours } from "@/app/services/dashboard/workingHours.service";

import { WorkingHour } from "@/app/types/dashboard/workingHours.type";


export async function fetchWorkingHours(): Promise<WorkingHour[]> {

  const data = await getWorkingHours();

  return data;

}