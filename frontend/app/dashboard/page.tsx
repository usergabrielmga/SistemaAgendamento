
import DashboardHeader from "@/app/components/dashboard/home/DashboardHeader";
import DashboardCard from "@/app/components/dashboard/home/DashboardCard";
import TodayAppointments from "@/app/components/dashboard/home/TodayAppointments";


import { getDashboardStats } from "@/app/components/dashboard/home/dashboard.service";
import { getTodayAppointments } from "../components/dashboard/home/appointments.service";

export default async function DashboardPage() {
  const todayAppointments = await getTodayAppointments();
  const stats = await getDashboardStats();

  return (
    <div className="w-[80%] space-y-8">

      <DashboardHeader />

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <DashboardCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      <TodayAppointments appointments={todayAppointments} />

    </div>
  );
}