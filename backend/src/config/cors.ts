
import cors from "cors";

export const corsConfig = cors({
  origin: [
    "http://localhost:3000",
    "https://sistema-agendamento-lovat.vercel.app",
  ],
  credentials: true,
});
