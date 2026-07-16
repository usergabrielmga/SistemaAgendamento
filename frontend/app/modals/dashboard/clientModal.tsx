"use client";

import {
  Mail,
  Phone,
  UserRound,
  X,
} from "lucide-react";

import { ClientDetails } from "@/app/types/dashboard/client.type";

interface Props {
  client: ClientDetails | null;
  open: boolean;
  onClose: () => void;
}

export default function ClientModal({
  client,
  open,
  onClose,
}: Props) {
  if (!open || !client) return null;

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-3">

    <div
      className="
        relative

        w-full
        max-w-[460px]

        rounded-2xl
        bg-white
        shadow-2xl

        px-4
        py-5

        md:px-6
        md:py-6
      "
    >

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-black transition cursor-pointer"
      >
        <X size={18} />
      </button>

      <div className="flex flex-col items-center">

        <div
          className="
            w-14
            h-14

            md:w-16
            md:h-16

            rounded-full
            bg-[#FAF4F2]

            flex
            items-center
            justify-center
          "
        >
          <UserRound
            size={28}
            className="text-[#C97B63]"
          />
        </div>

        <h2
          className="
            mt-3

            text-xl
            md:text-2xl

            font-serif
            font-bold
            text-[#1B120D]

            text-center
          "
        >
          {client.name}
        </h2>

      </div>

      <div className="my-5 h-px bg-gray-200" />

      <div className="space-y-4">

        <div className="flex items-center gap-3">

          <Phone
            size={17}
            className="text-[#8B4513]"
          />

          <div>

            <p className="text-sm text-black font-sans">
              Telefone
            </p>

            <p className="text-xs font-semibold text-[#8B4513] font-sans break-all">
              {client.telephone}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Mail
            size={17}
            className="text-[#8B4513]"
          />

          <div className="min-w-0">

            <p className="text-sm text-black font-sans">
              E-mail
            </p>

            <p className="text-xs font-semibold text-[#8B4513] font-sans break-all">
              {client.email}
            </p>

          </div>

        </div>

      </div>

      <div className="my-5 h-px bg-gray-200" />

      <div className="flex items-center justify-between mb-3">

        <h3 className="font-semibold font-sans text-base text-[#1B120D]">
          Histórico
        </h3>

        <span className="text-xs text-[#8B4513] font-sans">
          {client.totalAppointments} agendamento
          {client.totalAppointments !== 1 && "s"}
        </span>

      </div>

      {client.history.length === 0 ? (

        <div className="py-5 text-center text-sm text-black font-sans">
          Nenhum agendamento encontrado.
        </div>

      ) : (

        <div
          className="
            max-h-[140px]
            md:max-h-[170px]

            overflow-y-auto

            space-y-2

            pr-1
          "
        >

          {client.history.map((appointment) => (

            <div
              key={appointment.id_appointment}
              className="
                flex
                items-center
                justify-between
                gap-3

                rounded-lg
                border

                px-3
                py-2
              "
            >

              <div className="min-w-0">

                <p className="text-sm font-semibold text-[#1B120D] truncate font-sans">
                  {appointment.service}
                </p>

                <p className="text-xs text-[#8B4513] font-sans">
                  {appointment.date}
                </p>

              </div>

              <span
                className={`
                  shrink-0
                  rounded-full
                  px-2.5
                  py-1
                  text-[11px]
                  font-medium
                  font-sans
                  ${
                    appointment.status === "Realizado"
                      ? "bg-blue-100 text-blue-700"
                      : appointment.status === "Cancelado"
                      ? "bg-red-100 text-red-600"
                      : appointment.status === "Confirmado"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-600"
                  }
                `}
              >
                {appointment.status}
              </span>

            </div>

          ))}

        </div>

      )}

      <div className="mt-5">

        <button
          onClick={onClose}
          className="
            w-full
            rounded-lg
            bg-[#4D2615]
            py-2.5
            text-sm
            text-white
            hover:bg-[#3A1C10]
            transition
            cursor-pointer
          "
        >
          Fechar
        </button>

      </div>

    </div>

  </div>
);
}