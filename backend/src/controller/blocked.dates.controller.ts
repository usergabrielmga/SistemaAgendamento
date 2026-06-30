import BlockedDatesService from "../services/blocked.dates.service";
import { Request, Response } from "express";

class BlockedDatesController {

    async createBlockedDate(req: Request, res: Response) {
        try {

            const { block_date, start_time, end_time, reason } = req.body;

            const blockedDate = await BlockedDatesService.createBlockedDate(
                block_date,
                start_time,
                end_time,
                reason
            );

            return res.status(201).json(blockedDate);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

    async getAllBlockedDates(req: Request, res: Response) {
        try {

            const blockedDates = await BlockedDatesService.getAllBlockedDates();

            return res.status(200).json(blockedDates);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

    async updateBlockedDate(req: Request, res: Response) {
        try {

            const { id_block } = req.params;
            const { block_date, start_time, end_time, reason } = req.body;

            const blockedDate = await BlockedDatesService.updateBlockedDate(
                Number(id_block),
                block_date,
                start_time,
                end_time,
                reason
            );

            return res.status(200).json(blockedDate);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

    async deleteBlockedDate(req: Request, res: Response) {
        try {

            const { id_block } = req.params;

            await BlockedDatesService.deleteBlockedDate(Number(id_block));

            return res.status(200).json({
                message: "Blocked date deleted successfully."
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

}

export default new BlockedDatesController();