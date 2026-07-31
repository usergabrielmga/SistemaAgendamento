"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoChevronBack } from "react-icons/io5";

import BookingStepper from "./BookingStepper";
import { UseBookingReturn } from "@/app/hooks/agendamento/useBooking";
import { useCreateBooking } from "@/app/hooks/agendamento/mutations/create-booking.mutation";
import { bookingSchema, BookingFormData } from "@/app/schemas/agendamento/booking.schema";
import { useRouter } from "next/navigation";

interface ClientStepProps {
  booking: UseBookingReturn;
}

export default function ClientStep({ booking }: ClientStepProps) {
  const router = useRouter();
  const createBookingMutation = useCreateBooking();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    defaultValues: {
      name: booking.booking.client.name || "",
      phone: booking.booking.client.phone || "",
      email: booking.booking.client.email || "",
      observations: booking.booking.client.observations || "",
    },
  });

  // Atualiza o estado global do booking quando os campos mudam
  const formValues = watch();

  useEffect(() => {
    booking.setClient({
      name: formValues.name || "",
      phone: formValues.phone || "",
      email: formValues.email || "",
      observations: formValues.observations || "",
    });
  }, [formValues.name, formValues.phone, formValues.email, formValues.observations]);

  const onSubmit = (data: BookingFormData) => {
    const payload = {
      serviceId: booking.booking.service!.id_service,
      date: booking.booking.date!.toISOString().split("T")[0],
      hour: booking.booking.hour!,
      name: data.name,
      phone: data.phone,
      email: data.email || "",
      observations: data.observations || "",
    };

      createBookingMutation.mutate(payload, {
    onSuccess: (bookingCreated) => {
      router.push(
        `/agendamento/success/${bookingCreated.id}`
      );
    },
  });
  };

  return (
    <main className="min-h-screen w-full bg-[#FAF8F5] pb-16 pt-8">
      <section className="mx-auto flex w-full max-w-[760px] flex-col px-4 font-sans">
        <BookingStepper currentStep={booking.currentStep} />

        <button
          type="button"
          onClick={() => booking.previousStep()}
          className="mt-6 w-fit text-[15px] font-medium font-sans text-[#6E4A2F] transition hover:opacity-70 flex items-center gap-2 cursor-pointer"
        >
          <IoChevronBack size={18} />
          Voltar
        </button>

        <div className="mt-4">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#221B15]">
            Seus dados
          </h1>

          <p className="mt-2 text-sm text-[#736B63] font-sans">
            Preencha as informações para confirmar o agendamento.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4 rounded-2xl bg-[#F2ECE6] p-5 text-center">
            <div>
              <span className="block text-xs text-[#8C827A]">Serviço</span>
              <p className="mt-1 font-semibold text-[#221B15]">
                {booking.booking.service?.name || "Design de Sobrancelhas"}
              </p>
            </div>

            <div>
              <span className="block text-xs text-[#8C827A]">Data</span>
              <p className="mt-1 font-semibold text-[#221B15]">
                {booking.booking.date
                  ? booking.booking.date.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                    })
                  : "--/--"}
              </p>
            </div>

            <div>
              <span className="block text-xs text-[#8C827A]">Horário</span>
              <p className="mt-1 font-semibold text-[#221B15]">
                {booking.booking.hour || "--:--"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#221B15]">
                Nome completo <span className="text-[#B85C5C]">*</span>
              </label>

              <input
                type="text"
                {...register("name")}
                placeholder="Ana Paula Ferreira"
                className="h-12 w-full rounded-xl border border-[#E5DFD9] bg-white px-4 text-sm text-[#221B15] outline-none transition focus:border-[#A39284] focus:ring-1 focus:ring-[#A39284]"
              />
              {errors.name && (
                <span className="mt-1 block text-xs text-[#B85C5C]">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#221B15]">
                Telefone / WhatsApp <span className="text-[#B85C5C]">*</span>
              </label>

              <input
                type="text"
                {...register("phone")}
                placeholder="(11) 99999-0000"
                className="h-12 w-full rounded-xl border border-[#E5DFD9] bg-white px-4 text-sm text-[#221B15] outline-none transition focus:border-[#A39284] focus:ring-1 focus:ring-[#A39284]"
              />
              {errors.phone && (
                <span className="mt-1 block text-xs text-[#B85C5C]">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#221B15]">
                E-mail
              </label>

              <input
                type="email"
                {...register("email")}
                placeholder="seu@email.com (opcional)"
                className="h-12 w-full rounded-xl border border-[#E5DFD9] bg-white px-4 text-sm text-[#221B15] outline-none transition focus:border-[#A39284] focus:ring-1 focus:ring-[#A39284]"
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-[#B85C5C]">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#221B15]">
                Observações
              </label>

              <textarea
                {...register("observations")}
                placeholder="Alguma preferência adicional? (opcional)"
                className="min-h-28 w-full resize-none rounded-xl border border-[#E5DFD9] bg-white p-4 text-sm text-[#221B15] outline-none transition focus:border-[#A39284] focus:ring-1 focus:ring-[#A39284]"
              />
              {errors.observations && (
                <span className="mt-1 block text-xs text-[#B85C5C]">
                  {errors.observations.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || createBookingMutation.isPending}
            className={`mt-6 h-14 w-full rounded-2xl text-sm font-semibold transition-all duration-200 ${
              isValid && !createBookingMutation.isPending
                ? "bg-[#4A2810] text-white hover:bg-[#2D1809] active:scale-[0.99] cursor-pointer shadow-md"
                : "bg-[#E2DCD5] text-[#A3988E] cursor-not-allowed opacity-70"
            }`}
          >
            {createBookingMutation.isPending ? "Confirmando..." : "Confirmar agendamento"}
          </button>
        </form>
      </section>
    </main>
  );
}