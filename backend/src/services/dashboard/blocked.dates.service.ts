import { prisma } from "../../lib/prisma";

class BlockedDatesService {

    private formatTime(
    time?: string | null
) {

    if (
        !time ||
        time.trim() === ""
    ) {

        return null;

    }

    return new Date(
        `1970-01-01T${time}:00`
    );

}

    async createBlockedDate(
        block_date: string,
        start_time: string | null,
        end_time: string | null,
        reason: string
    ) {

        try {

            const blockedDate = await prisma.blocked_dates.create({

                data: {

                    block_date: new Date(block_date),

                    start_time: this.formatTime(start_time),

                    end_time: this.formatTime(end_time),

                    reason

                }

            });

            return blockedDate;

        } catch (error) {
            throw new Error("Error creating blocked date");
        }

    }

    async getAllBlockedDates() {

        try {

            return await prisma.blocked_dates.findMany({

                orderBy: {
                    block_date: "asc"
                }

            });

        } catch (error) {

            throw new Error("Error fetching blocked dates");

        }

    }

    async updateBlockedDate(
        id_block: number,
        block_date: string,
        start_time: string | null,
        end_time: string | null,
        reason: string
    ) {

        try {

            return await prisma.blocked_dates.update({

                where: {
                    id_block
                },

                data: {

                    block_date: new Date(block_date),

                    start_time: this.formatTime(start_time),

                    end_time: this.formatTime(end_time),

                    reason

                }

            });

        } catch (error) {

            throw new Error("Error updating blocked date");

        }

    }

    async deleteBlockedDate(id_block: number) {

        try {

            await prisma.blocked_dates.delete({

                where: {
                    id_block
                }

            });

        } catch (error) {

            throw new Error("Error deleting blocked date");

        }

    }

}

export default new BlockedDatesService();