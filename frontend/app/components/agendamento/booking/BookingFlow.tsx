"use client";

import { useBooking } from "../../../hooks/agendamento/useBooking";
import DateStep from "./DateStep";
import HourStep from "./HourStep";
import ClientStep from "./ClientStep";

import ServicesStep from "./ServicesStep";

export default function BookingFlow() {
  const booking = useBooking();

  return (
    <>
      {booking.currentStep === 1 && (
        <ServicesStep booking={booking} />
      )}

       {booking.currentStep === 2 && (
        <DateStep booking={booking} />
      )}
      
       {booking.currentStep === 3 && (
        <HourStep booking={booking} />
      )}

      {booking.currentStep === 4 && (
        <ClientStep booking={booking} />
      )}
      
    </>
  );
}