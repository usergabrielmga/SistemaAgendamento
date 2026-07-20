"use client";

import DashboardCard from "@/app/components/dashboard/home/DashboardCard";
import TodayAppointments from "@/app/components/dashboard/home/TodayAppointments";

import { useDashboard } from "@/app/hooks/dashboard/useDashboard";
import useAgenda from "@/app/hooks/dashboard/useAgenda";


export default function DashboardContent() {


  const {
    stats,
    isLoading: loadingStats,
  } = useDashboard();



  const {
    appointmentsDay,
    isLoading: loadingAgenda,
  } = useAgenda();



  if (loadingStats || loadingAgenda) {
    return (
      <div className="text-gray-500">
        Carregando dashboard...
      </div>
    );
  }



  return (
    <>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (

          <DashboardCard
            key={item.title}
            {...item}
          />

        ))}

      </div>



      <TodayAppointments
        appointments={appointmentsDay}
      />


    </>
  );
}