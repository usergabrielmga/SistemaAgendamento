import AppointmentCard from "./AppointmentCard";
import { AgendaAppointment } from "@/app/types/appointments.type";

interface Props {
  appointments: AgendaAppointment[];
}

export default function AppointmentList({
  appointments,
}: Props) {
  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-2xl border p-12 text-center">

        <h3 className="font-semibold text-lg">
          Nenhum agendamento
        </h3>

        <p className="text-gray-500 mt-2">
          Não existem agendamentos para este dia.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id_appointment}
          appointment={appointment}
        />
      ))}
    </div>
  );
}