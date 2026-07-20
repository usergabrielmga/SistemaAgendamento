"use client";

import useAgenda from "@/app/hooks/dashboard/useAgenda";

import AgendaCalendar from "@/app/components/dashboard/agenda/AgendaCalendar";
import AppointmentList from "@/app/components/dashboard/agenda/AppointmentList";


export default function AgendaPage() {

  const agenda = useAgenda();


  if (agenda.isLoading) {
    return (
      <main className="w-full md:w-auto">
        <div className="text-gray-500">
          Carregando agenda...
        </div>
      </main>
    );
  }


  if (agenda.error) {
    return (
      <main className="w-full md:w-auto">
        <div className="text-red-500">
          Erro ao carregar agenda.
        </div>
      </main>
    );
  }


  return (
    <main className="w-full md:w-auto space-y-10">

      <AgendaCalendar
        week={agenda.week}
        appointments={agenda.appointments}
        selectedDate={agenda.selectedDate}
        setSelectedDate={agenda.setSelectedDate}
      />


      <AppointmentList
        appointments={agenda.appointmentsDay}
      />

    </main>
  );
}