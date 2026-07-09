import 'dotenv/config';
import app from "./app";
import clientRoutes from "./routes/client.routes";
import authRoutes from './routes/auth.routes';
import service from './routes/service.routes';
import appointmentsRoutes from './routes/appointments.routes';
import workingHoursRoutes from './routes/hours.routes';
import blockedDatesRoutes from './routes/blocked.dates.routes';



const PORT = 3001;

app.use(clientRoutes);
app.use(authRoutes);
app.use(service);
app.use(appointmentsRoutes);
app.use(workingHoursRoutes);
app.use(blockedDatesRoutes);

app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
});