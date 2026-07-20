import { Request, Response } from "express";
import dashboardService from "../services/dashboard.service";

class DashboardController {
  async getStats(req: Request, res: Response) {
    try {
      const stats = await dashboardService.getStats();

      return res.status(200).json(stats);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar estatísticas do dashboard.",
      });
    }
  }
}

export default new DashboardController();