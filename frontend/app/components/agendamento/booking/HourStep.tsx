"use client";

import BookingStepper from "./BookingStepper";

import { UseBookingReturn } from "@/app/hooks/agendamento/useBooking";
import { useAvailableHours } from "@/app/hooks/agendamento/queries/available-hours.query";
import { IoChevronBack } from "react-icons/io5";


interface HourStepProps {
 booking: UseBookingReturn;
}


export default function HourStep({
 booking,
}: HourStepProps){


 const {
   data: hours = [],
   isLoading,
 } = useAvailableHours(
    booking.booking.service?.id_service,
    booking.booking.date
 );

 console.log("================================");
console.log("HORAS RECEBIDAS DA API");
console.log(hours);
console.log("HORÁRIO SELECIONADO:", booking.booking.hour);
console.log("================================");

 return (
  <main className="min-h-screen w-full bg-[#F8F5F2]">

   <section className="mx-auto flex w-full max-w-[920px] flex-col px-6">


    <BookingStepper
      currentStep={booking.currentStep}
    />

    <button
              type="button"
              onClick={() => booking.previousStep()}
              className="mt-6 w-fit text-[15px] font-medium font-sans text-[#6E4A2F] transition hover:opacity-70 flex items-center gap-2 cursor-pointer "
            >
              <IoChevronBack size={18}/>
              Voltar
      </button>

    <div className="mt-10">

      <h1 className="
        text-3xl
        font-bold
        font-serif
        tracking-tight
        text-[#222]
      ">
        Escolha um horário
      </h1>


      <p className="
        mt-3
        text-[15px]
        leading-7
        text-neutral-500
      ">
        Selecione um dos horários disponíveis para seu atendimento.
      </p>

    </div>



    <div className="
      mt-10
      rounded-3xl
      border
      border-[#E8E1DA]
      bg-white
      p-8
    ">


      {
        isLoading && (
          <div className="grid grid-cols-3 gap-4">
            {
              Array.from({
                length:6
              }).map((_,i)=>(
                <div
                 key={i}
                 className="
                   h-12
                   rounded-xl
                   bg-neutral-100
                   animate-pulse
                 "
                />
              ))
            }
          </div>
        )
      }



      {
       !isLoading && (

        <div className="
          grid
          grid-cols-3
          gap-4
        ">

        {
          hours.map((hour:string)=>(

            <button
              key={hour}
              onClick={() =>
                booking.setHour(hour)
              }

              className={`
                h-12
                rounded-xl
                border
                text-sm
                font-medium
                transition-all
                cursor-pointer

                ${
                 booking.booking.hour === hour
                 ?
                 "bg-[#3A1C12] text-white border-[#3A1C12]"
                 :
                 "border-[#E8E1DA] text-[#3A1C12] hover:bg-[#F3E8DE]"
                }
              `}
            >

              {hour}

            </button>

          ))
        }


        </div>

       )
      }


    </div>



    <button
      disabled={!booking.booking.hour}

      onClick={booking.nextStep}

      className={`
        mt-10
        h-14
        w-full
        rounded-2xl
        font-semibold
        text-white
        transition
        cursor-pointer

        ${
          booking.booking.hour
          ?
          "bg-[#4A2810] hover:bg-[#2D1809]"
          :
          "bg-neutral-300 cursor-not-allowed"
        }

      `}
    >
      Continuar
    </button>


   </section>

  </main>
 )
}