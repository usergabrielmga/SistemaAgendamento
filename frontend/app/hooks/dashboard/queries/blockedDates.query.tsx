import { getBlockedDates } from "@/app/services/dashboard/settings.service";

import { BlockedDate } from "@/app/types/dashboard/settings.type";


export async function fetchBlockedDates(): Promise<BlockedDate[]> {

  const data = await getBlockedDates();

  return data;

}