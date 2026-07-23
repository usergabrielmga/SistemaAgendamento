import 'dotenv/config';
import app from "./app";
import clientRoutes from "./routes/dashboard/client.routes";
import authRoutes from './routes/dashboard/auth.routes';
import service from './routes/dashboard/service.routes';
import appointmentsRoutes from './routes/dashboard/appointments.routes';
import workingHoursRoutes from './routes/dashboard/hours.routes';
import blockedDatesRoutes from './routes/dashboard/blocked.dates.routes';
import dashboardRoutes from './routes/dashboard/dashbord.routes';
import bookingRoutes from "./routes/agendamento/booking.routes";


const PORT = 3001;

app.use(clientRoutes);
app.use(authRoutes);
app.use(service);
app.use(appointmentsRoutes);
app.use(workingHoursRoutes);
app.use(blockedDatesRoutes);
app.use("/dashboard", dashboardRoutes);
app.use(bookingRoutes);

app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
});