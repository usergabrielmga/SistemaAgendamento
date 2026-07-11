"use client";

import { X } from "lucide-react";
import { AgendaAppointment } from "@/app/types/appointments.type";

interface Props {
  appointment: AgendaAppointment | null;
  open: boolean;
  onClose: () => void;
}

export default function AppointmentModal({
  appointment,
  open,
  onClose,
}: Props) {
  if (!open || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px] p-4">
      <div
        className="
          relative
          w-full
          max-w-[520px]
          max-h-[90vh]
          overflow-y-auto
          rounded-[28px]
          bg-white
          shadow-2xl
          px-5
          py-6
          md:px-8
          md:py-7
          animate-in
          fade-in
          zoom-in-95
        "
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 md:right-7 md:top-7 text-gray-500 hover:text-black transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl md:text-[30px] font-serif font-bold text-[#1B120D] pr-8">
          Detalhes do agendamento
        </h2>

        <div className="mt-6 md:mt-8 space-y-4 md:space-y-5">
          <Row
            label="Cliente"
            value={appointment.client}
          />

          <Row
            label="Telefone"
            value={appointment.telephone}
          />

          <Row
            label="Serviço"
            value={appointment.service}
          />

          <Row
            label="Data"
            value={appointment.date}
          />

          <Row
            label="Horário"
            value={appointment.hour}
          />

          <Row
            label="Valor"
            value={`R$ ${appointment.price}`}
          />
        </div>

        <div className="my-6 md:my-7 h-px bg-gray-200" />

        <div className="flex items-center justify-between gap-3">
          <span
            className={`
              rounded-full
              px-3
              py-1
              md:px-4
              text-[11px]
              md:text-xs
              font-medium
              whitespace-nowrap
              ${
                appointment.status === "Realizado"
                  ? "bg-sky-100 text-sky-700"
                  : "bg-orange-100 text-orange-600"
              }
            `}
          >
            {appointment.status}
          </span>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-50 px-4 py-2 md:px-5 text-sm font-medium text-red-500 hover:bg-red-100 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
}

function Row({ label, value }: RowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[#8B4513] text-sm md:text-base whitespace-nowrap">
        {label}
      </span>

      <span className="font-semibold text-[#1B120D] text-sm md:text-base text-right break-words">
        {value}
      </span>
    </div>
  );
}