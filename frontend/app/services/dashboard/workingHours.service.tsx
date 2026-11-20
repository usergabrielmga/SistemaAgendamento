import axios from "axios";

import {
  WorkingHour,
  UpdateWorkingHours,
} from "../../types/dashboard/workingHours.type";

const API_URL = "http://localhost:3001/working-hours";

export async function getWorkingHours() {

  const { data } =
    await axios.get<WorkingHour[]>(API_URL);

  return data;

}

export async function updateWorkingHours(
  workingHours: UpdateWorkingHours
) {

  const { data } =
    await axios.put(
      API_URL,
      workingHours
    );

  return data;

}