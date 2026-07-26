"use client";

import { useState } from "react";
import { BookingService } from "../../types/agendamento/booking.types";

export interface BookingClient {
  name: string;
  phone: string;
  email: string;
  observations: string;
}

export interface BookingState {
  service: BookingService | null;
  date: Date | null;
  hour: string | null;
  client: BookingClient;
}

const initialState: BookingState = {
  service: null,
  date: null,
  hour: null,
  client: {
    name: "",
    phone: "",
    email: "",
    observations: "",
  },
};

export function useBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>(initialState);

  function nextStep() {
    setCurrentStep((step) => Math.min(step + 1, 4));
  }

  function previousStep() {
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function setService(service: BookingService) {
  setBooking((prev) => ({
    ...prev,
    service,
    date: null,
    hour: null,
  }));
}

  function setDate(date: Date) {
    setBooking((prev) => ({
      ...prev,
      date,
    }));
  }

  function setHour(hour: string) {
    setBooking((prev) => ({
      ...prev,
      hour,
    }));
  }

  function setClient(client: BookingClient) {
    setBooking((prev) => ({
      ...prev,
      client,
    }));
  }

  function resetBooking() {
    setBooking(initialState);
    setCurrentStep(1);
  }

  return {
    booking,
    currentStep,
    nextStep,
    previousStep,
    setService,
    setDate,
    setHour,
    setClient,
    resetBooking,
  };
}

export type UseBookingReturn = ReturnType<typeof useBooking>;