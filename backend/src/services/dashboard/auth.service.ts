import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

class AuthService {
    static async loginService(username: string, password: string) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not defined");
        }

        const user = await prisma.admin.findUnique({
            where: { username },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return token;
    }

    static async createAdmin() {
        const username = process.env.USERNAME_ADMIN;
        const password = process.env.SENHA_ADMIN;

        if (!username || !password) {
            throw new Error("Admin credentials not set in environment");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.admin.upsert({
            where: { username },
            update: {},
            create: {
                username,
                password: hashedPassword,
            },
        });

        console.log("Admin inicial verificado/criado com sucesso");
    }
}

export default AuthService;