"use client";

import { useEffect, useMemo, useState } from "react";

import { getAppointments } from "../services/appointments.service";
import { getClients } from "../services/clients.service";
import { getServices } from "../services/services.service";

import { AgendaAppointment } from "../types/appointments.type";

import {
  getWeekDays,
  isAppointmentDay,
} from "../components/agenda/calendar";

export default function useAgenda() {
  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const [appointments, setAppointments] =
    useState<AgendaAppointment[]>([]);

  useEffect(() => {
    async function load() {
      const [
        appointments,
        clients,
        services,
      ] = await Promise.all([
        getAppointments(),
        getClients(),
        getServices(),
      ]);

      const data = appointments.map((appointment: any) => {
        const client = clients.find(
          (client: any) =>
            client.id_client ===
            appointment.id_client
        );

        const service = services.find(
          (service: any) =>
            service.id_service ===
            appointment.id_service
        );

        return {
           // Cliente
  client: client?.name ?? "Cliente",
  telephone: client?.telephone ?? "",
  email: client?.email ?? "",

  // Serviço
  service: service?.name ?? "Serviço",
  duration: service?.duration ?? 0,
  price: service?.price ?? "0",
  description: service?.description ?? "",

  // Agendamento
  hour: new Date(appointment.hour).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }),


          status:
            appointment.status,

          date:
            appointment.date,
        };
      });

      setAppointments(data);
    }

    load();
  }, []);

const appointmentsDay = useMemo(() => {
  return appointments.filter((appointment) =>
    isAppointmentDay(
      appointment.date,
      selectedDate
    )
  );
}, [appointments, selectedDate]);

  const week = getWeekDays(
    selectedDate
  );

  return {
    week,
    selectedDate,
    setSelectedDate,
    appointmentsDay,
    appointments,
  };
}