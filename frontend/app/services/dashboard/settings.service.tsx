import axios from "axios";

import {
  BlockedDate,
  CreateBlockedDate,
} from "../../types/dashboard/settings.type";

const API_URL = "http://localhost:3001";

export async function getBlockedDates() {
  const { data } = await axios.get<BlockedDate[]>(
    `${API_URL}/blocked-dates`
  );

  return data;
}

export async function createBlockedDate(
  blockedDate: CreateBlockedDate
) {
  const { data } = await axios.post(
    `${API_URL}/blocked-dates`,
    blockedDate
  );

  return data;
}

export async function updateBlockedDate(
  id: number,
  blockedDate: CreateBlockedDate
) {
  const { data } = await axios.put(
    `${API_URL}/blocked-dates/${id}`,
    blockedDate
  );

  return data;
}

export async function deleteBlockedDate(
  id: number
) {
  await axios.delete(
    `${API_URL}/blocked-dates/${id}`
  );
}