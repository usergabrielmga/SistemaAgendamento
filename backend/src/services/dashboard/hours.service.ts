import { prisma } from "../../lib/prisma";


function convertTimeToDate(time: string | null) {

    if (!time) return null;


    // Caso venha como ISO do frontend
    if (time.includes("T")) {

        const date = new Date(time);

        if (isNaN(date.getTime())) {
            return null;
        }

        return date;

    }


    // Caso venha do input: 08:30 ou 08:30:00
    const cleanTime = time.substring(0, 5);


    const [hours, minutes] = cleanTime
        .split(":")
        .map(Number);


    const date = new Date(0);


    date.setUTCHours(
        hours,
        minutes,
        0,
        0
    );


    return date;

}



function formatTimeFromDatabase(
    date: Date | null
) {

    if (!date) return null;


    return date
        .toISOString()
        .substring(11, 19);

}



class WorkingHoursService {


    async getWorkingHours() {

        try {


            const workingHours =
                await prisma.working_hours.findMany({

                    orderBy: {
                        day_of_week: "asc",
                    },

                });



            return workingHours.map((day) => ({

                ...day,

                start_time:
                    formatTimeFromDatabase(
                        day.start_time
                    ),


                end_time:
                    formatTimeFromDatabase(
                        day.end_time
                    ),

            }));


        } catch (error) {


            console.error(
                "ERROR GET WORKING HOURS:",
                error
            );


            throw new Error(
                "Error fetching working hours"
            );


        }

    }




    async updateWorkingHours(data: any[]) {

        try {


            console.log(
                "PAYLOAD:",
                JSON.stringify(data, null, 2)
            );



            const result =
                await prisma.$transaction(


                    data.map((day) =>

                        prisma.working_hours.update({

                            where: {

                                day_of_week:
                                    day.day_of_week,

                            },


                            data: {


                                is_active:
                                    day.is_active,


                                start_time:
                                    day.is_active
                                        ? convertTimeToDate(
                                            day.start_time
                                        )
                                        : null,


                                end_time:
                                    day.is_active
                                        ? convertTimeToDate(
                                            day.end_time
                                        )
                                        : null,


                            },

                        })

                    )


                );



            console.log(
                "UPDATED:",
                result
            );



            return {

                message:
                    "Working hours updated successfully.",

            };


        } catch (error) {


            console.error(
                "ERROR UPDATE WORKING HOURS:",
                error
            );


            throw error;


        }

    }


}


export default new WorkingHoursService();