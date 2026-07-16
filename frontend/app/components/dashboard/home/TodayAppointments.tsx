import { TodayAppointment } from "@/app/types/dashboard/appointments.type";

interface TodayAppointmentsProps {
  appointments: TodayAppointment[];
}

export default function TodayAppointments({
  appointments,
}: TodayAppointmentsProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-[20px] font-bold text-black font-serif">
          Agenda de hoje
        </h2>

        <button className="text-[#8B4513] hover:underline text-sm cursor-pointer font-sans">
          Ver agenda completa →
        </button>
      </div>

      <div className="bg-white border rounded-2xl divide-y">
        {appointments.map((appointment) => (
          <div
            key={appointment.id_appointment}
            className="flex flex-col md:flex-row md:items-center justify-between p-5"
          >
            <div className="flex gap-6">
              <div>
                <p className="font-bold text-black font-sans">
                  {appointment.hour}
                </p>

                <span className="text-xs text-[#8B4513] font-sans">
                  {appointment.duration} min
                </span>
              </div>
             <div className="w-px h-12 bg-gray-200 rounded-full"></div>

              <div>
                <h3 className="font-semibold text-black font-sans">
                  {appointment.client}
                </h3>

                <p className="text-[#8B4513] text-sm font-sans">
                  {appointment.service}
                </p>
              </div>
            </div>

            <span
              className="
                mt-4
                md:mt-0
                bg-blue-100
                text-[#156a91]
                px-3
                py-1
                rounded-full
                text-xs
                font-sans
              "
            >
              {appointment.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}