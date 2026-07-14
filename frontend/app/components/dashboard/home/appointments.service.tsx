import { getAppointments } from "@/app/services/dashboard/appointments.service";
import { getClients } from "@/app/services/dashboard/clients.service";
import { getServices } from "@/app/services/dashboard/services.service";
import { Appointment } from "@/app/types/dashboard/appointments.type";
import { Client } from "@/app/types/dashboard/client.type";
import { Services } from "@/app/types/dashboard/services.type";

export async function getTodayAppointments() {
  const [appointments, clients, services] = await Promise.all([
    getAppointments(),
    getClients(),
    getServices(),
  ]);

  const today = new Date().toISOString().slice(0, 10);

  return appointments
    .filter((appointment: Appointment) => {
      return appointment.date.slice(0, 10) === today;
    })
    .map((appointment: Appointment) => {
      const client = clients.find(
        (c: Client) => c.id_client === appointment.id_client
      );

      const service = services.find(
        (s: Services) => s.id_service === appointment.id_service
      );

      return {
        id_appointment: appointment.id_appointment,
        client: client?.name ?? "Cliente",
        service: service?.name ?? "Serviço",
        duration: service?.duration ?? 0,
        hour: new Date(appointment.hour).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: appointment.status,
      };
    });
}