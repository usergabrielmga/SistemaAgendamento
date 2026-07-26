"use client";

import { PiScissorsLight } from "react-icons/pi";

import BookingStepper from "./BookingStepper";
import { IoChevronBack } from "react-icons/io5";

import { UseBookingReturn } from "@/app/hooks/agendamento/useBooking";
import BookingCalendar from "./BookingCalendar";

interface DateStepProps {
  booking: UseBookingReturn;
}

export default function DateStep({
  booking,
}: DateStepProps) {
  const service = booking.booking.service;
  

  if (!service) return null;

  return (
    <main className="min-h-screen w-full bg-[#F8F5F2]">
      <section className="mx-auto flex w-full max-w-[920px] flex-col px-6">

        <BookingStepper currentStep={booking.currentStep} />

        <button
          onClick={booking.previousStep}
          className="mt-6 w-fit text-[15px] font-medium font-sans text-[#6E4A2F] transition hover:opacity-70 flex items-center gap-2 cursor-pointer "
        >
          <IoChevronBack size={18} />
          Voltar
        </button>

        <div
          className="
            mt-6
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-[#EEE4DB]
            bg-[#F5EEE7]
            px-5
            py-4
            font-sans
          "
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F2EE] text-[#C98B73]">
            <PiScissorsLight size={22} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-[#2A201A]">
              {service.name}
            </h3>

            <p className="text-sm text-[#7E6D61]">
              R$ {service.price.toFixed(2)}
              {" • "}
              {service.duration >= 60
                ? service.duration % 60 === 0
                  ? `${service.duration / 60}h`
                  : `${Math.floor(service.duration / 60)}h ${
                      service.duration % 60
                    }min`
                : `${service.duration} min`}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-3xl font-bold font-serif text-[#222]">
            Escolha a data
          </h1>

          <p className="mt-3 text-[15px] text-neutral-500 font-sans">
            Selecione um dia disponível para o agendamento.
          </p>
        </div>

        <BookingCalendar
          serviceId={booking.booking.service?.id_service ?? 0}
          selectedDate={booking.booking.date}
          onSelect={(date)=>{

            booking.setDate(date);

            booking.nextStep();

          }}
          
        />

      </section>
    </main>
  );
}