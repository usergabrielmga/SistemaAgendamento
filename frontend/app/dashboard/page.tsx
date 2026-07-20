import DashboardHeader from "@/app/components/dashboard/home/DashboardHeader";
import DashboardContent from "./home/DashboardContent";


export default function DashboardPage() {

  return (

    <div className="w-[80%] space-y-8">

      <DashboardHeader />

      <DashboardContent />

    </div>

  );
}