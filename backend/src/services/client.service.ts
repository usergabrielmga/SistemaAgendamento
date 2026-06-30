import { prisma } from "../lib/prisma";


class clientService {
  async createClient(name: string, email: string, telephone: string) {
    try {
      const client = await prisma.clients.create({
        data: {
            name,
            telephone,
            email,
        },
    });
    return client;
    } catch (error) {
      throw new Error("Error creating client");
    }
  }

  async getAllClients() {
    try {
      const clients = await prisma.clients.findMany();
      return clients;
    } catch (error) {
      throw new Error("Error fetching clients");
    }
  }

  async getClientById(id_client: number) {
    try {
      const client = await prisma.clients.findUnique({
        where: { id_client },
      });
      return client;
    } catch (error) {
      throw new Error("Error fetching client by ID");
    }
}
}

export default new clientService();
