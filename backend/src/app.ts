
import express from "express";
import { corsConfig } from "./config/cors";

// Rotas
import clientRoutes from "./routes/dashboard/client.routes";
import authRoutes from "./routes/dashboard/auth.routes";
import serviceRoutes from "./routes/dashboard/service.routes";
import appointmentsRoutes from "./routes/dashboard/appointments.routes";
import workingHoursRoutes from "./routes/dashboard/hours.routes";
import blockedDatesRoutes from "./routes/dashboard/blocked.dates.routes";
import dashboardRoutes from "./routes/dashboard/dashbord.routes";
import bookingRoutes from "./routes/agendamento/booking.routes";

const app = express();

// Middlewares
app.use(corsConfig);
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API rodando 🚀",
  });
});

// Rotas do sistema
app.use(clientRoutes);
app.use(authRoutes);
app.use(serviceRoutes);
app.use(appointmentsRoutes);
app.use(workingHoursRoutes);
app.use(blockedDatesRoutes);

// Dashboard
app.use("/dashboard", dashboardRoutes);

// Agendamentos públicos
app.use(bookingRoutes);

export default app;
