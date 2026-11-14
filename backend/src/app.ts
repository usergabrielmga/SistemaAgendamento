import express from "express";
import { corsConfig } from "./config/cors";

// Rotas
import clientRoutes from "./routes/dashboard/client.routes";
import authRoutes from "./routes/dashboard/auth.routes";
import service from "./routes/dashboard/service.routes";
import appointmentsRoutes from "./routes/dashboard/appointments.routes";
import workingHoursRoutes from "./routes/dashboard/hours.routes";
import blockedDatesRoutes from "./routes/dashboard/blocked.dates.routes";
import dashboardRoutes from "./routes/dashboard/dashbord.routes";
import bookingRoutes from "./routes/agendamento/booking.routes";
import servicesRoutes from "./routes/home/services.routes";

const app = express();

// Configurações
app.use(corsConfig);
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// Rotas da aplicação
app.use(clientRoutes);
app.use(authRoutes);
app.use(service);
app.use(appointmentsRoutes);
app.use(workingHoursRoutes);
app.use(blockedDatesRoutes);
app.use("/dashboard", dashboardRoutes);
app.use(bookingRoutes);
app.use(servicesRoutes);

export default app;