import { prisma } from "../lib/prisma";

class DashboardService {
  async getStats() {
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const [
      todayAppointments,
      pendingAppointments,
      totalClients,
      completedAppointments,
    ] = await Promise.all([
      prisma.appointments.count({
        where: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      }),

      prisma.appointments.count({
        where: {
          status: "Agendado",
        },
      }),

      prisma.clients.count(),

      prisma.appointments.findMany({
        where: {
          status: "Realizado",
          date: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        include: {
          services: {
            select: {
              price: true,
            },
          },
        },
      }),
    ]);

    const monthlyRevenue = completedAppointments.reduce(
      (total, appointment) =>
        total + Number(appointment.services.price),
      0
    );

    return {
      todayAppointments,
      pendingAppointments,
      totalClients,
      monthlyRevenue,
    };
  }
}

export default new DashboardService();