"use client";

import { ReactNode, useState } from "react";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { AgendaAppointment } from "@/app/types/dashboard/appointments.type";
import { updateAppointmentStatus } from "@/app/services/dashboard/appointments.service";

import ConfirmModal from "./ConfirmModal";

interface Props {
  appointment: AgendaAppointment | null;
  open: boolean;
  onClose: () => void;
}

interface RowProps {
  label: string;
  value: string | number | ReactNode;
}

function Row({ label, value }: RowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default function AppointmentModal({
  appointment,
  open,
  onClose,
}: Props) {

  const queryClient = useQueryClient();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  if (!open || !appointment) return null;



  async function handleFinishAppointment() {

    if (!appointment) return;


    try {

      setLoading(true);


      await updateAppointmentStatus(
        appointment.id_appointment,
        "Realizado"
      );


      // Atualiza agenda
      await queryClient.invalidateQueries({
        queryKey: ["agenda"],
      });


      // Atualiza cards do dashboard
      await queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });


      setConfirmOpen(false);

      onClose();


    } catch (error) {

      console.error(error);

      alert("Erro ao atualizar o status.");

    } finally {

      setLoading(false);

    }

  }



  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px] p-4 font-sans">

        <div
          className="
            relative
            w-full
            max-w-[450px]
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
            className="absolute right-5 top-5 md:right-7 md:top-7 text-gray-500 hover:text-black transition cursor-pointer"
          >
            <X size={20} />
          </button>


          <h2 className="text-2xl md:text-[30px] font-semibold font-serif text-[#1B120D] pr-8">
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
                font-sans
                ${
                  appointment.status === "Realizado"
                    ? "bg-sky-100 text-sky-700"
                    : "bg-orange-100 text-orange-600"
                }
              `}
            >
              {appointment.status}
            </span>



            <div className="flex items-center gap-2">

              {appointment.status !== "Realizado" && (

                <button
                  onClick={() => setConfirmOpen(true)}
                  className="
                    rounded-lg
                    bg-green-600
                    px-2
                    py-2
                    md:px-5
                    text-sm
                    font-medium
                    text-white
                    hover:bg-green-700
                    transition
                    cursor-pointer
                  "
                >
                  Realizado
                </button>

              )}



              <button
                onClick={onClose}
                className="
                  rounded-lg
                  bg-red-50
                  px-4
                  py-2
                  md:px-5
                  text-sm
                  font-medium
                  text-red-500
                  hover:bg-red-100
                  transition
                  cursor-pointer
                "
              >
                Fechar
              </button>

            </div>

          </div>

        </div>

      </div>



      <ConfirmModal
        open={confirmOpen}
        loading={loading}
        title="Concluir agendamento?"
        description="Tem certeza que deseja marcar este agendamento como realizado? Esta ação poderá ser alterada posteriormente apenas editando o agendamento."
        confirmText="Sim, concluir"
        cancelText="Voltar"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleFinishAppointment}
      />

    </>
  );
}