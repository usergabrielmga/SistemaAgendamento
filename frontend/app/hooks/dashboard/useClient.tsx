"use client";

import { useEffect, useMemo, useState } from "react";

import { getClients } from "../../services/dashboard/clients.service";
import { getAppointments } from "../../services/dashboard/appointments.service";
import { getServices } from "../../services/dashboard/services.service";

import {
  Appointment,
} from "../../types/dashboard/appointments.type";

import {
  ClientDetails,
} from "../../types/dashboard/client.type";

import {
  Services,
} from "../../types/dashboard/services.type";

export default function useClients() {
  const [clients, setClients] = useState<ClientDetails[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const [
        clients,
        appointments,
        services,
      ] = await Promise.all([
        getClients(),
        getAppointments(),
        getServices(),
      ]);

      const data: ClientDetails[] = clients.map((client: any) => {
        const clientAppointments = appointments.filter(
          (appointment: Appointment) =>
            appointment.id_client === client.id_client
        );

        const history = clientAppointments.map(
          (appointment: Appointment) => {
            const service = services.find(
              (service: Services) =>
                service.id_service ===
                appointment.id_service
            );

            return {
              id_appointment:
                appointment.id_appointment,

              service:
                service?.name ??
                "Serviço",

              date: new Date(
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

      setClients(data);
    }

    load();
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter(
      (client) =>
        client.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        client.telephone.includes(search)
    );
  }, [clients, search]);

  return {
    search,
    setSearch,
    filteredClients,
  };
}