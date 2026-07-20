import { getDashboardStats as getDashboardStatsApi } from "@/app/services/dashboard/home.service";

import {
  CalendarDays,
  Clock3,
  DollarSign,
  Users,
} from "lucide-react";

export async function getDashboardStats() {
  const stats = await getDashboardStatsApi();

  return [
    {
      title: "Hoje",
      value: stats.todayAppointments,
      icon: CalendarDays,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      title: "Pendentes",
      value: stats.pendingAppointments,
      icon: Clock3,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
    {
      title: "Clientes",
      value: stats.totalClients,
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      title: "Receita do mês",
      value: `R$ ${Number(stats.monthlyRevenue).toFixed(2)}`,
      icon: DollarSign,
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
  ];
}