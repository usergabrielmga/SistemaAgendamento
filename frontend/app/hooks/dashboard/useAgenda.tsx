"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchAgendaAppointments } from "./queries/agenda.query";

import {
  getWeekDays,
  isAppointmentDay,
} from "@/app/components/dashboard/agenda/calendar";


export default function useAgenda(){

  const [
    selectedDate,
    setSelectedDate
  ] = useState(new Date());


  const {
    data: appointments = [],
    isLoading,
    error,
    refetch,
  } = useQuery({

    queryKey:["agenda"],

    queryFn:
      fetchAgendaAppointments,

  });



  const appointmentsDay = useMemo(()=>{

    return appointments.filter(
      appointment =>
        isAppointmentDay(
          appointment.date,
          selectedDate
        )
    );

  },[
    appointments,
    selectedDate
  ]);



  return {

    week:
      getWeekDays(selectedDate),

    selectedDate,

    setSelectedDate,

    appointmentsDay,

    appointments,

    isLoading,

    error,

    refetch,

  };

}