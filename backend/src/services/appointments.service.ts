import { prisma } from "../lib/prisma";


class AppointmentsService {
  async createAppointment(data: {
    id_client: number;
    id_service: number;
    date: Date;
    hour: Date;
    observations?: string;
    status?: string;
  }) {
    try {
      const appointment = await prisma.appointments.create({
        data: {
          id_client: data.id_client,
          id_service: data.id_service,
          date: data.date,
          hour: data.hour,
          observations: data.observations,
          status: data.status,
        },
      });

      return appointment;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating appointment");
    }
  }

  async getAllAppointments() {
    try {
      const appointments = await prisma.appointments.findMany();
      return appointments;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching appointments");
    }
  }
}

export default new AppointmentsService();