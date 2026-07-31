"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useBookingSuccess } from "@/app/hooks/agendamento/useBookingSuccess";

interface Props {
  id: number;
}

export default function BookingSuccess({
  id,
}: Props) {
  const {
    data: booking,
    isLoading,
    isError,
  } = useBookingSuccess(id);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <p className="font-sans text-[#736B63]">
          Carregando agendamento...
        </p>
      </main>
    );
  }

  if (isError || !booking) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <p className="font-sans text-[#736B63]">
          Agendamento não encontrado.
        </p>
      </main>
    );
  }

  const [year, month, day] = booking.date
    .split("-")
    .map(Number);

  const bookingDate = new Date(
    year,
    month - 1,
    day
  );

  const formattedDate =
    bookingDate.toLocaleDateString(
      "pt-BR",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  const formattedHour = new Date(
    booking.hour
  ).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col items-center px-4 py-10">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#DDF7E8]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#18A058]">
            <Check
              size={28}
              className="text-[#18A058]"
            />
          </div>
        </div>

        <h1 className="mt-8 text-center font-serif text-4xl font-bold text-[#221B15] md:text-5xl">
          Agendamento confirmado!
        </h1>

        <p className="mt-4 max-w-md text-center font-sans text-[15px] leading-7 text-[#736B63]">
          Seu horário foi reservado com sucesso.
          <br />
          Esperamos você no dia combinado.
        </p>

        <div className="mt-10 w-full max-w-md rounded-3xl bg-[#EFE5DB] p-6">
          <div className="flex items-center justify-between border-b border-[#E3D7CC] py-3">
            <span className="font-sans text-sm text-[#7E736A]">
              Serviço
            </span>

            <span className="text-right font-sans text-sm font-semibold text-[#221B15]">
              {booking.service.name}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-[#E3D7CC] py-3">
            <span className="font-sans text-sm text-[#7E736A]">
              Data
            </span>

            <span className="text-right font-sans text-sm font-semibold capitalize text-[#221B15]">
              {formattedDate}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-[#E3D7CC] py-3">
            <span className="font-sans text-sm text-[#7E736A]">
              Horário
            </span>

            <span className="font-sans text-sm font-semibold text-[#221B15]">
              {formattedHour}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="font-sans text-sm text-[#7E736A]">
              Valor
            </span>

            <span className="font-sans text-sm font-semibold text-[#221B15]">
              R${" "}
              {booking.service.price
                .toFixed(2)
                .replace(".", ",")}
            </span>
          </div>
        </div>

        <p className="mt-8 text-center font-sans text-sm text-[#736B63]">
          Para reagendar ou tirar dúvidas, entre em contato pelo WhatsApp.
        </p>

        <Link
          href="/agendamento"
          className="mt-8 rounded-2xl bg-[#4A2810] px-8 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#2D1809]"
        >
          Voltar ao início
        </Link>
      </section>
    </main>
  );
}