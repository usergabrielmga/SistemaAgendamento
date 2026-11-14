import { Request, Response } from "express";
import { getServicesService } from "../../services/agendamento/booking.service";

class ServicesController {
  async getServices(req: Request, res: Response) {
    const services = await getServicesService();

    return res.json(services);
  }
}

export default new ServicesController();