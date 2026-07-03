import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Scissors,
  Settings,
  LogOut,
} from "lucide-react";

export const routes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agenda",
    href: "/dashboard/agenda",
    icon: CalendarDays,
  },
  {
    title: "Clientes",
    href: "/dashboard/clientes",
    icon: Users,
  },
  {
    title: "Serviços",
    href: "/dashboard/servicos",
    icon: Scissors,
  },
  {
    title: "Configurações",
    href: "/dashboard/configuracoes",
    icon: Settings,
  },
];

export const logout = {
  title: "Sair",
  href: "/login",
  icon: LogOut,
};