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

    async updateService(id_service: number, data: { name?: string; description?: string; duration?: number; price?: number }) {
        try {
            const updatedService = await prisma.services.update({
                where: { id_service },
                data,
            });
            return updatedService;
        } catch (error) {
            throw new Error("Error updating service" + error);
        }
    }

    async deleteService(id_service: number) {
        try {
            await prisma.services.delete({
                where: { id_service },
            });
        } catch (error) {
            throw new Error("Error deleting service" + error);
        }
    }
}

export default new Service();