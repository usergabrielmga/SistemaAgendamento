import { getAppointments } from "@/app/services/dashboard/appointments.service";
import { getClients } from "@/app/services/dashboard/clients.service";
import { getServices } from "@/app/services/dashboard/services.service";

import { AgendaAppointment } from "@/app/types/dashboard/appointments.type";


export async function fetchAgendaAppointments(): Promise<AgendaAppointment[]> {

  const [
    appointments,
    clients,
    services,
  ] = await Promise.all([
    getAppointments(),
    getClients(),
    getServices(),
  ]);


  return appointments.map((appointment:any)=>{

    const client = clients.find(
      (client:any)=>
        client.id_client === appointment.id_client
    );


    const service = services.find(
      (service:any)=>
        service.id_service === appointment.id_service
    );


    return {

      id_appointment:
        appointment.id_appointment,

      client:
        client?.name ?? "Cliente",

      telephone:
        client?.telephone ?? "",

      email:
        client?.email ?? "",


      service:
        service?.name ?? "Serviço",

      duration:
        service?.duration ?? 0,

      price:
        service?.price ?? "0",


      hour:
        new Date(
          appointment.hour
        ).toLocaleTimeString(
          "pt-BR",
          {
            hour:"2-digit",
            minute:"2-digit",
          }
        ),


      status:
        appointment.status,

      date:
        appointment.date,

    };

  });

}