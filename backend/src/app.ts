import 'dotenv/config';
import express from "express";
import { corsConfig } from "./config/cors";

// Importação das suas rotas
import clientRoutes from "./routes/dashboard/client.routes";
import authRoutes from './routes/dashboard/auth.routes';
import service from './routes/dashboard/service.routes';
import appointmentsRoutes from './routes/dashboard/appointments.routes';
import workingHoursRoutes from './routes/dashboard/hours.routes';
import blockedDatesRoutes from './routes/dashboard/blocked.dates.routes';
import dashboardRoutes from './routes/dashboard/dashbord.routes';
import bookingRoutes from "./routes/agendamento/booking.routes";
import servicesRoutes from './routes/home/services.routes';

const app = express();

// 1. Configurações iniciais
app.use(corsConfig);
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// 2. Registro de todas as rotas
app.use(clientRoutes);
app.use(authRoutes);
app.use(service);
app.use(appointmentsRoutes);
app.use(workingHoursRoutes);
app.use(blockedDatesRoutes);
app.use("/dashboard", dashboardRoutes);
app.use(bookingRoutes);
app.use(servicesRoutes);

// 3. Inicialização local (para rodar na sua máquina com npm run dev / node)
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// 4. Exportação obrigatória para a Vercel
export default app;