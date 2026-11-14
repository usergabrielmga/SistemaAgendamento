import cors from "cors";

export const corsConfig = cors({
  origin: [
    "http://localhost:3000",
    "https://sistema-agendamento-dvyq-eight.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});