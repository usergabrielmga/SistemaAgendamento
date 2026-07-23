import WorkingHoursService from "../../services/dashboard/hours.service";
import { Request, Response } from "express";

class WorkingHoursController {

    async getWorkingHours(req: Request, res: Response) {
        try {

            const workingHours = await WorkingHoursService.getWorkingHours();

            return res.status(200).json(workingHours);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

    async updateWorkingHours(req: Request, res: Response) {
        try {

            const workingHours = await WorkingHoursService.updateWorkingHours(req.body);

            return res.status(200).json(workingHours);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

}

export default new WorkingHoursController();