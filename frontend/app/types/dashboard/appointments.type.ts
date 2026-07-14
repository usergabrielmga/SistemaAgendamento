export interface AppointmentItemProps {
  time: string;
  duration: string;
  client: string;
  service: string;
  status: "Pendente" | "Confirmado" | "Realizado" | "Cancelado";
}


 export interface Appointment {
    id_appointment: number,
    id_client: number,
    id_service: number,
    date: string,
    hour: string,
    status: string,
    observations: string
}

export interface TodayAppointment {
  id_appointment: number;
  client: string;
  service: string;
  hour: string;
  duration: number;
  status: string;
}


export interface AgendaAppointment {
  id_appointment: number;

  client: string;
  telephone: string;
  email: string;

  service: string;
  duration: number;
  price: string;

  hour: string;
  status: string;
  date: string;

  observations: string;
}