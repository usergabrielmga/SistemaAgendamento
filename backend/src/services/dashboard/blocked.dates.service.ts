import { prisma } from "../../lib/prisma";
    import { format } from "date-fns";

class BlockedDatesService {

    private formatDate(date: string): Date {

    const [year, month, day] =
        date.split("-").map(Number);

    return new Date(
        year,
        month - 1,
        day
    );

}

   private formatTime(time?: string | null): Date | null {
  if (!time || time.trim() === "") {
    return null;
  }

  const [hour, minute, second = "00"] = time.split(":");

  const date = new Date(0);

  date.setHours(
    Number(hour),
    Number(minute),
    Number(second),
    0
  );

  return date;
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

                block_date: this.formatDate(block_date),

                start_time: this.formatTime(start_time),

                end_time: this.formatTime(end_time),

                reason

            }

        });

        return {

            id_block: blockedDate.id_block,

            block_date: blockedDate.block_date
            .toISOString()
            .slice(0, 10),

            start_time: blockedDate.start_time
                ? format(blockedDate.start_time, "HH:mm")
                : null,

            end_time: blockedDate.end_time
                ? format(blockedDate.end_time, "HH:mm")
                : null,

            reason: blockedDate.reason,

        };

    } catch (error) {

        console.error(error);

        throw error;

    }

}

    
async getAllBlockedDates() {

    try {

        const blockedDates =
            await prisma.blocked_dates.findMany({

                orderBy: {
                    block_date: "asc"
                }

            });

        return blockedDates.map((blockedDate) => ({

            id_block: blockedDate.id_block,

           block_date: blockedDate.block_date
            .toISOString()
            .slice(0, 10),

            start_time: blockedDate.start_time
                ? format(blockedDate.start_time, "HH:mm")
                : null,

            end_time: blockedDate.end_time
                ? format(blockedDate.end_time, "HH:mm")
                : null,

            reason: blockedDate.reason,

        }));

    } catch (error) {

        console.error(error);

        throw error;

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

        const blockedDate =
            await prisma.blocked_dates.update({

                where: {
                    id_block
                },

                data: {

                    block_date: this.formatDate(block_date),

                    start_time: this.formatTime(start_time),

                    end_time: this.formatTime(end_time),

                    reason

                }

            });

        return {

            id_block: blockedDate.id_block,

            block_date: blockedDate.block_date
            .toISOString()
            .slice(0, 10),

            start_time: blockedDate.start_time
                ? format(blockedDate.start_time, "HH:mm")
                : null,

            end_time: blockedDate.end_time
                ? format(blockedDate.end_time, "HH:mm")
                : null,

            reason: blockedDate.reason,

        };

    } catch (error) {

        console.error(error);

        throw error;

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