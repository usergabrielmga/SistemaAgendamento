import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

class AppointmentsController {
    async createAppointment(req: Request, res: Response) {
        try {
            const { id_client, id_service, date, hour, status } = req.body;

            const appointment = await prisma.appointments.create({
                data: {
                    id_client,
                    id_service,
                    date: new Date(date),
                    hour: new Date(hour),
                    status,
                    observations: req.body.observations || null,
                },
            });

            res.status(201).json(appointment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error creating appointment" });
        }
    }

    async getAllAppointments(req: Request, res: Response) {
        try {
            const appointments = await prisma.appointments.findMany();
            res.status(200).json(appointments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error fetching appointments" });
        }
    }
}

export default new AppointmentsController();