import { getClients } from "@/app/services/dashboard/clients.service";
import { getAppointments } from "@/app/services/dashboard/appointments.service";
import { getServices } from "@/app/services/dashboard/services.service";

import { Appointment } from "@/app/types/dashboard/appointments.type";
import { ClientDetails } from "@/app/types/dashboard/client.type";
import { Services } from "@/app/types/dashboard/services.type";


export async function fetchClients(): Promise<ClientDetails[]> {

  const [
    clients,
    appointments,
    services,
  ] = await Promise.all([
    getClients(),
    getAppointments(),
    getServices(),
  ]);


  const data = clients.map((client: any) => {

    const clientAppointments = appointments.filter(
      (appointment: Appointment) =>
        appointment.id_client === client.id_client
    );


    const history = clientAppointments.map(
      (appointment: Appointment) => {

        const service = services.find(
          (service: Services) =>
            service.id_service === appointment.id_service
        );


        return {
          id_appointment:
            appointment.id_appointment,

          service:
            service?.name ?? "Serviço",

          date:
            new Date(
              appointment.date
            ).toLocaleDateString("pt-BR"),

          status:
            appointment.status,
        };

      }
    );


    return {
      ...client,

      totalAppointments:
        clientAppointments.length,

      history,

    };

  });


  return data;
}