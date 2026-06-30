import { prisma } from "../lib/prisma";
import { Request, Response } from "express";


class Service {
    async createService(req: Request, res: Response) {
        const { name, description, duration, price} = req.body;
        try {
            const service = await prisma.services.create({
                data: {
                    name,
                    description,
                    duration,
                    price,
                }
            });
            return service;
        } catch (error) {
            throw new Error("Error creating service" + error);
        }
    }

    async getAllServices() {
        try {
            const services = await prisma.services.findMany();
            return services;
        } catch (error) {
            throw new Error("Error fetching services" + error);
        }
    }

    async getServiceById(id_service: number) {
        try {
            const service = await prisma.services.findUnique({
                where: { id_service },
            });
            return service;
        } catch (error) {
            throw new Error("Error fetching service by ID" + error);
        }
    }
}

export default new Service();