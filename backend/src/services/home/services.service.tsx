import { prisma } from "../../lib/prisma";


class Services {
    async  getServicesService() {
    return prisma.services.findMany({
        orderBy: {
        name: "asc",
        },
    });
    }
}


export default new Services();