import axios from "axios";

import { Services } from "../../types/dashboard/services.type";

const API_URL = "http://localhost:3001/services";

export async function getServices() {

  const response = await axios.get(
    API_URL
  );

  return response.data;

}

export async function getServiceById(
  id_service: number
) {

  const response = await axios.get(
    `${API_URL}/${id_service}`
  );

  return response.data;

}

export async function createService(
  service: Omit<Services, "id_service">
) {

  const response = await axios.post(
    API_URL,
    service
  );

  return response.data;

}

export async function updateService(
  id_service: number,
  service: Omit<Services, "id_service">
) {

  const response = await axios.put(
    `${API_URL}/${id_service}`,
    service
  );

  return response.data;

}

export async function deleteService(
  id_service: number
) {

  await axios.delete(
    `${API_URL}/${id_service}`
  );

}