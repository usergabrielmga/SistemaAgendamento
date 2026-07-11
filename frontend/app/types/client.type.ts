export interface Client {
  id_client: number;
  name: string;
  telephone: string;
  email: string;
}

export interface ClientHistory {
  id_appointment: number;
  service: string;
  date: string;
  status: string;
}

export interface ClientDetails extends Client {
  totalAppointments: number;
  history: ClientHistory[];
}