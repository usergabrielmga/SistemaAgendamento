import { getAppointments } from "@/app/services/dashboard/appointments.service";
import { getClients } from "@/app/services/dashboard/clients.service";
import { getServices } from "@/app/services/dashboard/services.service";

import {
  CalendarDays,
  Clock3,
  DollarSign,
  Users,
} from "lucide-react";

import { Appointment } from "@/app/types/dashboard/appointments.type";
import { Services } from "@/app/types/dashboard/services.type";

function countTodayAppointments(appointments: Appointment[]): number {
    
  const today = new Date();

  return appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);

    return (
      appointmentDate.getFullYear() === today.getFullYear() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getDate() === today.getDate()
    );
  }).length;
}

function countPendingAppointments(appointments: Appointment[]): number {
  return appointments.filter(
    (appointment) => appointment.status === "Agendado"
  ).length;
}

function getMonthlyRevenue(services: Services[], appointments: Appointment[]): number {
  return appointments.reduce((acc, appointment) => {
    if (appointment.status !== "Realizado") return acc;

    const service = services.find(
      (s: Services) => s.id_service === appointment.id_service
    );

    if (!service) return acc;

    return acc + parseFloat(String(service.price ?? '0'));
  }, 0);
}

export async function getDashboardStats() {
  const [appointments, clients, services] = await Promise.all([
    getAppointments(),
    getClients(),
    getServices(),
  ]);


  return [
    {
      title: "Hoje",
      value: countTodayAppointments(appointments),
      icon: CalendarDays,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      title: "Pendentes",
      value: countPendingAppointments(appointments),
      icon: Clock3,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
    {
      title: "Clientes",
      value: clients.length,
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      title: "Receita do mês",
      value: `R$ ${getMonthlyRevenue(services, appointments).toFixed(2)}`,
      icon: DollarSign,
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
  ];
}