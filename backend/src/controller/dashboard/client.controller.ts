import ClientService from "../../services/dashboard/client.service";
import { Request, Response } from "express";

class ClientController {
  async createClient(req: Request, res: Response) {
    try {
        const { name, email, telephone } = req.body;
        
        const client = await ClientService.createClient(name, email, telephone);
    
        return res.status(201).json(client);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

    async getAllClients(req: Request, res: Response) {
        try {
            const clients = await ClientService.getAllClients();
            return res.status(200).json(clients);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

    async getClientById(req: Request, res: Response) {
        try {
            const { id_client } = req.params;
            const client = await ClientService.getClientById(Number(id_client));
            if (!client) {
                return res.status(404).json({ error: "Client not found" });
            }
            return res.status(200).json(client);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

}

export default new ClientController();