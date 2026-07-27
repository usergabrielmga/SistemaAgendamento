import { TodayAppointment } from "@/app/types/dashboard/appointments.type";
import { useRouter } from "next/navigation";

interface TodayAppointmentsProps {
  appointments: TodayAppointment[];
}

export default function TodayAppointments({
  appointments,
}: TodayAppointmentsProps) {

   const router = useRouter();

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg sm:text-[20px] font-bold text-black font-serif">
          Agenda de hoje
        </h2>

        <button onClick={() => router.push("/dashboard/agenda")} className="text-[#8B4513] hover:underline text-xs sm:text-sm cursor-pointer font-sans">
          Ver agenda completa →
        </button>
      </div>

      <div className="bg-white border rounded-2xl divide-y">
        {appointments.map((appointment) => (
          <div
            key={appointment.id_appointment}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5"
          >
            <div className="flex gap-4 sm:gap-6">
              <div className="shrink-0">
                <p className="font-bold text-black font-sans text-sm sm:text-base">
                  {appointment.hour}
                </p>

                <span className="text-xs text-[#8B4513] font-sans">
                  {appointment.duration} min
                </span>
              </div>

              <div className="w-px h-10 sm:h-12 bg-gray-200 rounded-full"></div>

              <div className="min-w-0">
                <h3 className="font-semibold text-black font-sans text-sm sm:text-base truncate">
                  {appointment.client}
                </h3>

                <p className="text-[#8B4513] text-sm font-sans truncate">
                  {appointment.service}
                </p>
              </div>
            </div>

            <span
              className="
                mt-4
                md:mt-0
                self-start
                md:self-auto
                bg-blue-100
                text-[#156a91]
                px-3
                py-1
                rounded-full
                text-xs
                font-sans
                whitespace-nowrap
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