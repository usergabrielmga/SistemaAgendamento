"use client";

import BookingStepper from "./BookingStepper";
import ServiceCard from "./ServiceCard";

import { useServices } from "@/app/hooks/agendamento/queries/services.query";
import { UseBookingReturn } from "@/app/hooks/agendamento/useBooking";


interface ServicesStepProps {
  booking: UseBookingReturn;
}

export default function ServicesStep({
  booking,
}: ServicesStepProps) {
  const {
    data: services = [],
    isLoading,
  } = useServices();

  return (
    <main className="min-h-screen w-full bg-[#F8F5F2]">
      <section className="mx-auto flex w-full max-w-[920px] flex-col px-6">
        <BookingStepper currentStep={booking.currentStep} />

        <div className="mt-10">
          <h1 className="text-3xl font-bold font-serif tracking-tight text-[#222222]">
            Escolha um serviço
          </h1>

          <p className="mt-3 text-[15px] leading-7 text-neutral-500 font-sans">
            Escolha um dos serviços abaixo para iniciar seu agendamento.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-[28px] bg-white"
              />
            ))}

          {!isLoading &&
            services.map((service) => (
              <ServiceCard
                key={service.id_service}
                service={service}
                selected={
                  booking.booking.service?.id_service ===
                  service.id_service
                }
                onSelect={booking.setService}
              />
            ))}
        </div>

        <div className="mt-auto py-8">
          <button
            onClick={booking.nextStep}
            disabled={!booking.booking.service}
            className={`
              h-14
              w-full
              rounded-2xl
              font-semibold
              text-white
              transition-all
              duration-300
              cursor-pointer
              ${
                booking.booking.service
                  ? "bg-[#4A2810] hover:bg-[#2D1809]"
                  : "cursor-not-allowed bg-neutral-300"
              }
            `}
          >
            Continuar
          </button>
        </div>
      </section>
    </main>
  );
}