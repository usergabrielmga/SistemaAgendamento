import { AppointmentItemProps } from "@/app/types/appointments.type";

const statusStyles = {
  Pendente: "bg-yellow-100 text-yellow-700",
  Confirmado: "bg-green-100 text-green-700",
  Realizado: "bg-blue-100 text-blue-700",
  Cancelado: "bg-red-100 text-red-700",
};

export default function AppointmentItem({
  time,
  duration,
  client,
  service,
  status,
}: AppointmentItemProps) {
  return (
    <div className="flex flex-col gap-4 p-5 transition border-b last:border-b-0 hover:bg-gray-50 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-5">
        <div className="min-w-[70px]">
          <p className="text-lg font-semibold">{time}</p>
          <span className="text-xs text-gray-500">{duration}</span>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">{client}</h3>
          <p className="text-sm text-gray-500">{service}</p>
        </div>
      </div>

      <span
        className={`self-start md:self-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
      >
        {status}
      </span>
    </div>
  );
}