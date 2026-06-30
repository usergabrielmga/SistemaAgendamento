import { Request, Response } from "express";
import Service from "../services/service.service";

class ServiceController {
    async createService(req: Request, res: Response) {
        try {
            const service = await Service.createService(req, res);
            return res.status(201).json(service);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

    async getAllServices(req: Request, res: Response) {
        try {
            const services = await Service.getAllServices();
            return res.status(200).json(services);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

    async getServiceById(req: Request, res: Response) {
        try {
            const { id_service } = req.params;
            const service = await Service.getServiceById(Number(id_service));
            if (!service) {
                return res.status(404).json({ error: "Service not found" });
            }
            return res.status(200).json(service);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }
}

export default new ServiceController();