import { prisma } from "../lib/prisma";

class WorkingHoursService {

    async getWorkingHours() {
        try {

            const workingHours = await prisma.working_hours.findMany({
                orderBy: {
                    day_of_week: "asc",
                },
            });

            return workingHours;

        } catch (error) {
            throw new Error("Error fetching working hours");
        }
    }

    async updateWorkingHours(data: any[]) {
        try {

            await prisma.$transaction(

                data.map((day) =>
                    prisma.working_hours.update({
                        where: {
                            day_of_week: day.day_of_week,
                        },
                        data: {
                        is_active: day.is_active,
                        start_time: day.start_time
                            ? new Date(`1970-01-01T${day.start_time}.000Z`)
                            : null,
                        end_time: day.end_time
                            ? new Date(`1970-01-01T${day.end_time}.000Z`)
                            : null,
                    },
                    })
                )

            );

            return {
                message: "Working hours updated successfully.",
            };

        } catch (error) {
                console.error(error);
                throw error;
            }
    }

}

export default new WorkingHoursService();