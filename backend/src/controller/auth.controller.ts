import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
    static async login(req: Request, res: Response) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "Username and password are required"
            });
        }

        try {
            const token = await AuthService.loginService(username, password);

            return res.status(200).json({
                token,
            });
        } catch (error) {
            return res.status(401).json({
                error: "Usuário ou senha inválidos",
            });
        }
    }
}

export default AuthController;