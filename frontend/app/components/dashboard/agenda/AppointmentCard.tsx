"use client";

import { useState } from "react";

import { ChevronRight } from "lucide-react";

import { AgendaAppointment } from "@/app/types/dashboard/appointments.type";
import AppointmentModal from "@/app/modals/dashboard/AppointmentModal";

interface Props {
  appointment: AgendaAppointment;
}

export default function AppointmentCard({
  appointment,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white rounded-2xl border px-4 py-4 md:px-6 md:py-5 flex items-center justify-between hover:shadow-sm transition"
      >
      <div className="flex items-center gap-3 md:gap-6 min-w-0">

        <div className="min-w-[55px] md:min-w-[70px]">
          <p className="font-bold text-base md:text-lg">
            {appointment.hour}
          </p>

          <span className="text-[11px] md:text-xs text-[#8B4513]">
            {appointment.duration} min
          </span>
        </div>

        <div className="w-px h-10 md:h-12 bg-gray-200" />

        <div className="min-w-0">
          <h3 className="font-semibold text-sm md:text-base truncate">
            {appointment.client}
          </h3>

          <p className="text-[#8B4513] text-xs md:text-sm truncate">
            {appointment.service}
          </p>
        </div>

      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">

        <span
          className={`px-2.5 py-1 md:px-4 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap ${
            appointment.status === "Realizado"
              ? "bg-blue-100 text-blue-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {appointment.status}
        </span>

        <ChevronRight
          size={16}
          className="text-gray-400 md:w-[18px] md:h-[18px]"
        />

      </div>
    </div>

      <AppointmentModal
        open={open}
        onClose={() => setOpen(false)}
        appointment={appointment}
      />
    </>
  );
}